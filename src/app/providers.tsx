"use client"

import { ChakraProviders } from "@/controllers/chakra"

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProviders>{children}</ChakraProviders>
}
