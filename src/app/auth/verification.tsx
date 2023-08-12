import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Heading,
  Icon,
  Text
} from "@chakra-ui/react"

import NextLink from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Bars } from "react-loader-spinner"

import { Colors } from "@/theme/foundations/colors"
import { capitalize } from "@/lib/string"

import SuccessIcon from "@/visuals/icons/success"
import ExpiredIcon from "@/visuals/icons/expired"
import { nextUrlFor } from "@/controllers/shared/next-url"

export type EmailVerificationStatus = "pending" | "expired" | "verified"

function CtaSection({
  handleLinkResend,
  status
}: {
  handleLinkResend: () => unknown
  status: EmailVerificationStatus
}) {
  const DEFAULT_COUNTDOWN_BEFORE_LINK_RESEND = 20
  const [countDown, setCountDown] = useState<number>(
    DEFAULT_COUNTDOWN_BEFORE_LINK_RESEND
  )

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (status === "expired") {
      setCountDown(0)
    }

    if (status === "pending" && countDown > 0) {
      setTimeout(() => {
        setCountDown(countDown - 1)
      }, 1000)
    }
  }, [status, countDown])

  return (
    <Box>
      <Text fontWeight="medium" my={4} textAlign="center">
        {(status === "pending" || status === "expired") && (
          <>
            Resend verification link:{" "}
            <Box as="span" color="primary.500" display="inline-block" w={7}>
              {countDown}s
            </Box>
          </>
        )}

        {status === "verified" && "Go to next page"}
      </Text>

      <Button
        {...(status === "verified"
          ? {
              as: NextLink,
              href: nextUrlFor(`${pathname}?${searchParams.toString()}`)
            }
          : {})}
        colorScheme="primary"
        isDisabled={countDown > 0}
        onClick={() => {
          if (status === "verified") {
            return
          }
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          ;(async () => {
            const result = handleLinkResend()
            if (result instanceof Promise) await result
          })()
          setCountDown(DEFAULT_COUNTDOWN_BEFORE_LINK_RESEND)
        }}
        type="submit"
        w="full"
      >
        {status === "verified" ? "Go" : "Get new link"}
      </Button>
    </Box>
  )
}

export function EmailVerificationBox({
  emailAddress,
  status,
  handleLinkResend,
  handleEmailChange
}: {
  emailAddress: string
  status: EmailVerificationStatus
  handleLinkResend: () => unknown
  handleEmailChange: () => unknown
}) {
  return (
    <Box>
      <Center mb={8}>
        {status === "pending" && (
          <Bars
            height="80"
            width="80"
            color={Colors.primary[500]}
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible
          />
        )}

        {status === "verified" && <Icon as={SuccessIcon} boxSize={24} />}
        {status === "expired" && <Icon as={ExpiredIcon} boxSize={24} />}
      </Center>

      <Heading
        as="h1"
        color="gray.700"
        fontSize="2xl"
        fontWeight={700}
        mb={4}
        mx="auto"
        textAlign="center"
      >
        {status === "pending" && "Waiting for Verification"}
        {status === "verified" && "Verification Successful"}
        {status === "expired" && "Link Expired"}
      </Heading>

      <HStack
        border="2px solid"
        borderColor="gray.200"
        borderRadius="full"
        mb={5}
        mx="auto"
        p={1}
        w="max"
      >
        <Box px={3}>{capitalize(emailAddress)}</Box>
        <Button
          borderRadius="full"
          isDisabled={status === "verified"}
          onClick={handleEmailChange}
          size="sm"
        >
          Change
        </Button>
      </HStack>

      <Text my={4} textAlign="center">
        {status === "pending" &&
          "Click on the verification link sent to your email to continue"}
        {status === "verified" && "You will be redirected shortly"}
        {status === "expired" && "Please restart authentication"}
      </Text>

      <Divider />

      <CtaSection handleLinkResend={handleLinkResend} status={status} />
    </Box>
  )
}
