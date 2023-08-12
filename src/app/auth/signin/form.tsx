"use client"

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

import { SITE_NAME } from "@/constants/site"
import { PublicImageUrls } from "@/controllers/asset"

export function SignInForm() {
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
        Welcome back
      </Heading>

      <Stack as="form" mt={6} spacing={3}>
        <FormControl isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input type="email" />
        </FormControl>

        <Button colorScheme="primary" type="submit" w="full">
          Continue
        </Button>
      </Stack>
    </Box>
  )
}
