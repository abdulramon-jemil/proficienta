import { defineStyleConfig } from "@chakra-ui/react"

export const ButtonTheme = defineStyleConfig({
  baseStyle: {
    _disabled: {
      opacity: 0.6
    }
  },

  sizes: {
    md: {
      fontSize: "sm"
    }
  }
})
