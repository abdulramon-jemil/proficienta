import { extendTheme } from "@chakra-ui/react"
import { ButtonStyles } from "./components/button"
import { BreakPoints } from "./foundations/breakpoints"
import { Colors } from "./foundations/colors"
import { Fonts } from "./foundations/fonts"
import { Styles } from "./styles"

export const theme = extendTheme({
  breakpoints: BreakPoints,
  colors: Colors,
  fonts: Fonts,
  styles: Styles,

  components: {
    Button: ButtonStyles
  }
})
