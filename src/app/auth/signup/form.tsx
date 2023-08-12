import NextImage from "next/image"
import { Image as ChakraNextImage } from "@chakra-ui/next-js"

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack
} from "@chakra-ui/react"

import type { Dispatch, SetStateAction } from "react"

import { SITE_NAME } from "@/constants/site"
import { PublicImageUrls } from "@/controllers/asset"

import type { SignUpInfo } from "./base"

export function SignUpForm({
  handleSignUp,
  signUpInfoState,
  enableSignUpButton
}: {
  handleSignUp: () => void
  enableSignUpButton: boolean
  signUpInfoState: [SignUpInfo, Dispatch<SetStateAction<SignUpInfo>>]
}) {
  const [signUpInfo, setSignUpInfo] = signUpInfoState

  const { firstName, lastName, emailAddress } = signUpInfo

  const initializeSignUp: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    handleSignUp.call(null)
  }

  return (
    <Box>
      <ChakraNextImage
        as={NextImage}
        alt={`${SITE_NAME} Logo`}
        height={50}
        m="auto"
        src={PublicImageUrls.SiteLogo}
        width={50}
        h={12}
        w={12}
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
        Create Account
      </Heading>

      <Stack
        as="form"
        mt={6}
        spacing={3}
        onSubmit={
          // Required since Chakra is unable to infer type from `as` prop
          initializeSignUp as unknown as React.FormEventHandler<HTMLDivElement>
        }
      >
        <HStack spacing={3}>
          <FormControl isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              onChange={(event) => {
                setSignUpInfo({ ...signUpInfo, firstName: event.target.value })
              }}
              type="text"
              value={firstName}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              onChange={(event) => {
                setSignUpInfo({ ...signUpInfo, lastName: event.target.value })
              }}
              type="text"
              value={lastName}
            />
          </FormControl>
        </HStack>

        <FormControl isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            onChange={(event) => {
              setSignUpInfo({ ...signUpInfo, emailAddress: event.target.value })
            }}
            type="email"
            value={emailAddress}
          />
        </FormControl>

        <Button
          colorScheme="primary"
          isDisabled={!enableSignUpButton}
          type="submit"
          w="full"
        >
          Continue
        </Button>
      </Stack>
    </Box>
  )
}
