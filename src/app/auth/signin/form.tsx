import NextImage from "next/image"
import { Image as ChakraNextImage } from "@chakra-ui/next-js"

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack
} from "@chakra-ui/react"

import type { Dispatch, SetStateAction } from "react"

import { SITE_NAME } from "@/constants/site"
import { PublicImageUrls } from "@/controllers/asset"

import type { SignInInfo } from "./base"

export function SignInForm({
  enableSignInButton,
  handleSignIn,
  signInInfoState
}: {
  enableSignInButton: boolean
  handleSignIn: () => unknown
  signInInfoState: [SignInInfo, Dispatch<SetStateAction<SignInInfo>>]
}) {
  const [signInInfo, setSignInInfo] = signInInfoState

  return (
    <Box>
      <ChakraNextImage
        as={NextImage}
        alt={`${SITE_NAME} Logo`}
        height={50}
        m="auto"
        src={PublicImageUrls.SiteLogo}
        width={50}
        h={14}
        w={14}
      />

      <Heading
        as="h1"
        color="gray.700"
        fontSize="2xl"
        fontWeight={700}
        mx="auto"
        mt={5}
        textAlign="center"
      >
        Welcome back
      </Heading>

      <Stack
        as="form"
        mt={6}
        onSubmit={(event) => {
          event.preventDefault()
          handleSignIn.call(null)
        }}
        spacing={3}
      >
        <FormControl isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            onChange={(event) => {
              setSignInInfo({ emailAddress: event.target.value })
            }}
            type="email"
            value={signInInfo.emailAddress}
          />
        </FormControl>

        <Button
          colorScheme="primary"
          isDisabled={!enableSignInButton}
          type="submit"
          w="full"
        >
          Continue
        </Button>
      </Stack>
    </Box>
  )
}
