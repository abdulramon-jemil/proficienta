"use client"

import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  Text,
  VStack
} from "@chakra-ui/react"

import { Bars } from "react-loader-spinner"
// import SuccessIcon from "@/visuals/icons/success"
// import ExpiredIcon from "@/visuals/icons/expired"
import FailedIcon from "@/visuals/icons/failed"
import { Colors } from "@/theme/foundations/colors"

function FinalizedVerificationBox() {
  return (
    <Box>
      <Center mb={8}>
        {/* <Icon as={SuccessIcon} boxSize={24} /> */}
        {/* <Icon as={ExpiredIcon} boxSize={24} /> */}
        <Icon as={FailedIcon} boxSize={24} />
      </Center>

      <Heading
        as="h1"
        color="gray.700"
        fontSize="2xl"
        fontWeight={700}
        mx="auto"
        textAlign="center"
      >
        {/* Verification Successful */}
        {/* Link Expired */}
        Verification Failed
      </Heading>

      <Text my={4} textAlign="center">
        {/* You can return to the previous tab or use
        the link below (if you signed in on this device) */}
        {/* To ensure safety, verification links expire after a certain period */}
        We were unable to verify you, please sign in again
      </Text>

      <Button colorScheme="primary" type="submit" w="full">
        {/* Continue */}
        Sign In
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
  return (
    <FinalizedVerificationBox />
    // <PendingVerificationBox />
  )
}
