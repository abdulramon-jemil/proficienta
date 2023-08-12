"use client"

import { Box } from "@chakra-ui/react"
// import { EmailVerificationBox } from "@/app/auth/pending"
import { SignInForm } from "./form"

export default function SignUpPage() {
  return (
    <Box>
      <SignInForm />
      {/* <EmailVerificationBox /> */}
    </Box>
  )
}
