import { ChakraProvider } from "@chakra-ui/react"
import { CacheProvider } from "@chakra-ui/next-js"
import { theme as extendedTheme } from "@/theme"

export function ChakraProviders({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider
        theme={extendedTheme}
        toastOptions={{
          defaultOptions: {
            position: "top-right",
            isClosable: true,
            duration: 6000
          }
        }}
      >
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}
