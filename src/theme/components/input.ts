import { inputAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers, cssVar } from "@chakra-ui/styled-system"
import { Colors } from "@/theme/foundations/colors"

const helpers = createMultiStyleConfigHelpers(inputAnatomy.keys)

// Chakra UI requires this for some reason, see
// https://github.com/chakra-ui/chakra-ui/blob/f5b1a3569fd0c654897d2397b3d0bd4677783fa7/packages/components/theme/src/components/input.ts#L13
// for the default theme source
const inputFontSizeVariable = cssVar("input-font-size")

export const InputTheme = helpers.defineMultiStyleConfig({
  sizes: {
    md: {
      field: {
        [inputFontSizeVariable.variable]: "fontSizes.sm"
      }
    }
  },

  variants: {
    outline({ colorScheme }) {
      interface ColorSchemeColors {
        borderColor: string
        boxShadowColor: string
      }

      type ColorsByColorScheme = Record<
        string,
        ColorSchemeColors | undefined
      > & {
        primary: ColorSchemeColors
        default: ColorSchemeColors
      }

      const colorsByColorScheme: ColorsByColorScheme = {
        primary: {
          borderColor: Colors.primary[300],
          boxShadowColor: Colors.primary[50]
        },

        default: {
          borderColor: Colors.primary[300],
          boxShadowColor: Colors.primary[50]
        }
      }

      const colorSchemeColors =
        colorsByColorScheme[colorScheme] ?? colorsByColorScheme.default

      return {
        field: {
          _focusVisible: {
            borderColor: colorSchemeColors.borderColor,
            boxShadow: `0 0 0 3px ${colorSchemeColors.boxShadowColor}`
          }
        }
      }
    }
  },

  defaultProps: {
    colorScheme: "primary"
  }
})
