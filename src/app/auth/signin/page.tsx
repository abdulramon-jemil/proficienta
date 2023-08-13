"use client"

import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Box, useToast } from "@chakra-ui/react"
import { useSignIn } from "@clerk/nextjs"

import {
  assignNextURL,
  getDistinctNextURL,
  hasDistinctNextURL,
  nextUrlFor
} from "@/controllers/shared/next-url"
import { AUTH_VERIFICATION_PAGE } from "@/constants/pages"
import { EmailVerificationBox } from "@/app/auth/verification"

import type { EmailVerificationStatus } from "@/app/auth/verification"
import {
  AUTH_PAGE_DEFAULT_REDIRECT_URL,
  AUTH_PAGE_REDIRECT_DELAY_MS,
  getAuthErrorMessageWithFallback
} from "@/app/auth/base"

import type { SignInInfo } from "./base"
import { SignInForm } from "./form"

function getFullAuthVerificationURL() {
  return hasDistinctNextURL(window.location.href)
    ? assignNextURL(
        AUTH_VERIFICATION_PAGE,
        nextUrlFor(window.location.href),
        true
      )
    : new URL(AUTH_VERIFICATION_PAGE, window.location.origin).href
}

export default function SignUpPage() {
  const {
    isLoaded: clerkIsLoaded,
    setActive: setActiveSessionInSignInClient,
    signIn
  } = useSignIn()

  const toast = useToast()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const signInInfoState = useState<SignInInfo>({ emailAddress: "" })

  const [magicLinkFlowHandler, setMagicLinkFlowHandler] = useState<ReturnType<
    NonNullable<typeof signIn>["createMagicLinkFlow"]
  > | null>(null)

  type EmailVerification =
    | {
        isStarted: true
        emailAddressId: string
        status: EmailVerificationStatus
      }
    | {
        isStarted: false
        emailAddressId: null
        status: null
      }

  const [emailVerification, setEmailVerification] = useState<EmailVerification>(
    {
      isStarted: false,
      emailAddressId: null,
      status: null
    }
  )

  async function setupMagicLinkVerification(emailAddressId: string) {
    // Prevent typescript errors, could also use an assertion
    if (!clerkIsLoaded) return

    const createdMagicLinkFlowHandler = signIn.createMagicLinkFlow()
    const magicLinkFlowPromise = createdMagicLinkFlowHandler.startMagicLinkFlow(
      {
        emailAddressId,
        redirectUrl: getFullAuthVerificationURL()
      }
    )

    setMagicLinkFlowHandler(createdMagicLinkFlowHandler)
    setEmailVerification({ isStarted: true, emailAddressId, status: "pending" })

    const updatedSignIn = await magicLinkFlowPromise
    const theEmailVerification = updatedSignIn.firstFactorVerification

    if (theEmailVerification.status === "expired") {
      setEmailVerification({
        isStarted: true,
        emailAddressId,
        status: "expired"
      })
    }

    if (updatedSignIn.status === "complete") {
      setEmailVerification({
        isStarted: true,
        emailAddressId,
        status: "verified"
      })

      if (!theEmailVerification.verifiedFromTheSameClient()) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        setActiveSessionInSignInClient({
          session: updatedSignIn.createdSessionId
        })

        setTimeout(() => {
          router.push(
            getDistinctNextURL(
              `${pathname}?${searchParams.toString()}`,
              AUTH_PAGE_DEFAULT_REDIRECT_URL
            )
          )
        }, AUTH_PAGE_REDIRECT_DELAY_MS)
      }
    }
  }

  function initiateEmailChange() {
    if (magicLinkFlowHandler?.cancelMagicLinkFlow)
      magicLinkFlowHandler.cancelMagicLinkFlow()

    setEmailVerification({
      isStarted: false,
      emailAddressId: null,
      status: null
    })
  }

  async function resendVerificationLink() {
    // As TS type guard
    if (!emailVerification.isStarted) return

    if (magicLinkFlowHandler?.cancelMagicLinkFlow)
      magicLinkFlowHandler.cancelMagicLinkFlow()

    try {
      await setupMagicLinkVerification(emailVerification.emailAddressId)
    } catch (error) {
      toast({
        title: getAuthErrorMessageWithFallback(
          error,
          "Unable to resend verification link"
        ),
        status: "error"
      })
    }
  }

  function handleSignIn() {
    if (!clerkIsLoaded) return

    const initializeEmailVerificationProcess = async () => {
      const si = await signIn.create({
        identifier: signInInfoState[0].emailAddress
      })

      const emailLinkFirstFactor = si.supportedFirstFactors.find(
        (firstFactor) =>
          firstFactor.strategy === "email_link" &&
          firstFactor.safeIdentifier === signInInfoState[0].emailAddress
      ) as import("@clerk/types").EmailLinkFactor

      const { emailAddressId } = emailLinkFirstFactor
      await setupMagicLinkVerification(emailAddressId)
    }

    initializeEmailVerificationProcess().catch((error) => {
      toast({
        title: getAuthErrorMessageWithFallback(
          error,
          "Unable to complete the email verification process"
        ),
        status: "error"
      })
    })
  }

  return (
    <Box>
      {!emailVerification.isStarted && (
        <SignInForm
          enableSignInButton={clerkIsLoaded}
          handleSignIn={handleSignIn}
          signInInfoState={signInInfoState}
        />
      )}

      {emailVerification.isStarted && (
        <EmailVerificationBox
          emailAddress={signInInfoState[0].emailAddress}
          handleEmailChange={initiateEmailChange}
          handleLinkResend={resendVerificationLink}
          status={emailVerification.status}
        />
      )}
    </Box>
  )
}
