"use client"

import { useState } from "react"
import { useSignUp } from "@clerk/nextjs"
import { Box, useToast } from "@chakra-ui/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import {
  assignNextURL,
  getDistinctNextURL,
  hasDistinctNextURL,
  nextUrlFor
} from "@/controllers/shared/next-url"

import {
  EmailVerificationBox,
  type EmailVerificationStatus
} from "@/app/auth/verification"

import { AUTH_VERIFICATION_PAGE } from "@/constants/pages"
import {
  AUTH_PAGE_DEFAULT_REDIRECT_URL,
  AUTH_PAGE_REDIRECT_DELAY_MS
} from "@/app/auth/base"

import { SignUpForm } from "./form"
import type { SignUpInfo } from "./base"

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
  const toast = useToast()
  const {
    isLoaded: clerkIsLoaded,
    signUp,
    setActive: setActiveSessionInSignUpClient
  } = useSignUp()

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [magicLinkFlowHandler, setMagicLinkFlowHandler] = useState<ReturnType<
    NonNullable<typeof signUp>["createMagicLinkFlow"]
  > | null>(null)

  const signUpInfoState = useState<SignUpInfo>({
    firstName: "",
    lastName: "",
    emailAddress: ""
  })

  type EmailVerification =
    | {
        isStarted: true
        status: EmailVerificationStatus
      }
    | {
        isStarted: false
        status: null
      }

  const [emailVerification, setEmailVerification] = useState<EmailVerification>(
    {
      isStarted: false,
      status: null
    }
  )

  async function setupMagicLinkVerification() {
    // Prevent typescript errors, could also use an assertion
    if (!clerkIsLoaded) return

    const createdMagicLinkFlowHandler = signUp.createMagicLinkFlow()
    const magicLinkFlowPromise = createdMagicLinkFlowHandler.startMagicLinkFlow(
      {
        redirectUrl: getFullAuthVerificationURL()
      }
    )

    setMagicLinkFlowHandler(createdMagicLinkFlowHandler)
    setEmailVerification({ isStarted: true, status: "pending" })

    const updatedSignUp = await magicLinkFlowPromise
    const theEmailVerification = updatedSignUp.verifications.emailAddress

    if (theEmailVerification.status === "expired") {
      setEmailVerification({ isStarted: true, status: "expired" })
    }

    if (updatedSignUp.status === "complete") {
      setEmailVerification({ isStarted: true, status: "verified" })
      if (!theEmailVerification.verifiedFromTheSameClient()) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        setActiveSessionInSignUpClient({
          session: updatedSignUp.createdSessionId
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

    setEmailVerification({ isStarted: false, status: null })
  }

  async function resendVerificationLink() {
    if (magicLinkFlowHandler?.cancelMagicLinkFlow)
      magicLinkFlowHandler.cancelMagicLinkFlow()

    try {
      await setupMagicLinkVerification()
    } catch (error) {
      toast({
        title: "Unable to resend verification link",
        status: "error"
      })
    }
  }

  function handleSignUp() {
    if (!clerkIsLoaded) return

    const initializeEmailVerificationProcess = async () => {
      await signUp.create(signUpInfoState[0])
      await setupMagicLinkVerification()
    }

    initializeEmailVerificationProcess().catch(() => {
      toast({
        title: "Unable to complete the email verification process",
        status: "error"
      })
    })
  }

  return (
    <Box>
      {!emailVerification.isStarted && (
        <SignUpForm
          enableSignUpButton={clerkIsLoaded}
          handleSignUp={handleSignUp}
          signUpInfoState={signUpInfoState}
        />
      )}

      {emailVerification.isStarted && (
        <EmailVerificationBox
          emailAddress={signUpInfoState[0].emailAddress}
          handleEmailChange={initiateEmailChange}
          handleLinkResend={resendVerificationLink}
          status={emailVerification.status}
        />
      )}
    </Box>
  )
}
