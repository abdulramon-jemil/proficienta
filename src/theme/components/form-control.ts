import { formAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system"

const helpers = createMultiStyleConfigHelpers(formAnatomy.keys)

export const FormControlTheme = helpers.defineMultiStyleConfig({
  baseStyle: {
    requiredIndicator: {
      color: "green",
      display: "none"
    }
  },

  variants: {
    full: {
      requiredIndicator: {
        display: "inline"
      }
    }
  }
})
