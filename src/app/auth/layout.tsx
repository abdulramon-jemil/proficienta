"use client"

import { Box } from "@chakra-ui/react"

export default function AuthPageLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Box
      as="main"
      bg={{
        base: `
        linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url('https://api.dicebear.com/6.x/shapes/svg?seed=Willow')
      `
      }}
      bgPos={{ base: "right", sm: "center center" }}
      bgSize="cover"
      h="100vh"
      overflow="auto"
      p={5}
    >
      <Box
        bg={{ base: "white" }}
        borderRadius="2xl"
        margin="auto"
        maxW="sm"
        my={10}
        pb={6}
        pt={12}
        px={6}
      >
        {children}
      </Box>
    </Box>
  )
}
