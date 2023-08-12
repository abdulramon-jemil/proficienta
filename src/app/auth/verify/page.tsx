"use client"

import NextLink from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { MagicLinkErrorCode, isMagicLinkError, useClerk } from "@clerk/nextjs"
import { Bars } from "react-loader-spinner"

import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  Text,
  VStack,
  useToast
} from "@chakra-ui/react"

import SuccessIcon from "@/visuals/icons/success"
import ExpiredIcon from "@/visuals/icons/expired"
import FailedIcon from "@/visuals/icons/failed"
import { Colors } from "@/theme/foundations/colors"
import { SIGN_IN_PAGE } from "@/constants/pages"

import {
  assignNextURL,
  getDistinctNextURL,
  hasDistinctNextURL,
  nextUrlFor
} from "@/controllers/shared/next-url"

import { AUTH_PAGE_DEFAULT_REDIRECT_URL } from "../base"

type PendingVerificationStatus = "loading"
type FinalizedVerificationStatus = "verified" | "expired" | "failed"
type VerificationStatus =
  | PendingVerificationStatus
  | FinalizedVerificationStatus

function FinalizedVerificationBox({
  status
}: {
  status: FinalizedVerificationStatus
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const fullPagePath = `${pathname}?${searchParams.toString()}`

  return (
    <Box>
      <Center mb={8}>
        {status === "verified" && <Icon as={SuccessIcon} boxSize={24} />}
        {status === "expired" && <Icon as={ExpiredIcon} boxSize={24} />}
        {status === "failed" && <Icon as={FailedIcon} boxSize={24} />}
      </Center>

      <Heading
        as="h1"
        color="gray.700"
        fontSize="2xl"
        fontWeight={700}
        mx="auto"
        textAlign="center"
      >
        {
          {
            verified: "Verification Successful",
            expired: "Link Expired",
            failed: "Verification Failed"
          }[status]
        }
      </Heading>

      <Text my={4} textAlign="center">
        {
          {
            verified: "Please return to the original tab to continue",
            expired: "Please sign in again",
            failed: "Please sign in again"
          }[status]
        }
      </Text>

      <Button
        as={NextLink}
        colorScheme="primary"
        href={
          hasDistinctNextURL(fullPagePath)
            ? assignNextURL(SIGN_IN_PAGE, nextUrlFor(fullPagePath))
            : SIGN_IN_PAGE
        }
        type="submit"
        w="full"
      >
        Sign in here
      </Button>
    </Box>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function PendingVerificationBox() {
  return (
    <VStack justifyContent="center" minH={72}>
      <Bars
        ariaLabel="bars-loading"
        color={Colors.primary[500]}
        height="80"
        visible
        width="80"
        wrapperClass=""
        wrapperStyle={{}}
      />

      <Text color="gray.700" fontWeight="medium" mt={3} textAlign="center">
        Verifying
      </Text>
    </VStack>
  )
}

export default function VerificationPage() {
  const [status, setStatus] = useState<VerificationStatus>("loading")
  const { handleMagicLinkVerification } = useClerk()
  const toast = useToast()

  useEffect(() => {
    async function doVerification() {
      try {
        const nextUrlToUse = getDistinctNextURL(
          window.location.href,
          AUTH_PAGE_DEFAULT_REDIRECT_URL
        )
        await handleMagicLinkVerification({
          redirectUrl: nextUrlToUse,
          redirectUrlComplete: nextUrlToUse
        })

        setStatus("verified")
      } catch (error) {
        let verificationStatus: FinalizedVerificationStatus = "failed"
        const theError = error as Error

        if (isMagicLinkError(theError)) {
          if (theError.code === MagicLinkErrorCode.Expired) {
            verificationStatus = "expired"
          } else {
            throw theError
          }
        }

        setStatus(verificationStatus)
      }
    }

    doVerification().catch(() => {
      toast({
        title: "Verification check failed",
        status: "error"
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {status === "loading" && <PendingVerificationBox />}
      {status !== "loading" && <FinalizedVerificationBox status={status} />}
    </>
  )
}
