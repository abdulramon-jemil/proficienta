import { ChakraProvider } from "@chakra-ui/react"
import { CacheProvider } from "@chakra-ui/next-js"
import { theme as extendedTheme } from "@/theme"

export function ChakraProviders({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={extendedTheme}>{children}</ChakraProvider>
    </CacheProvider>
  )
}
