import { extendTheme } from "@chakra-ui/react"

import { BreakPoints } from "./foundations/breakpoints"
import { Colors } from "./foundations/colors"
import { Fonts } from "./foundations/fonts"
import { Styles } from "./styles"

import { ButtonTheme } from "./components/button"
import { InputTheme } from "./components/input"
import { FormControlTheme } from "./components/form-control"
import { FormLabelTheme } from "./components/form-label"

export const theme = extendTheme({
  breakpoints: BreakPoints,
  colors: Colors,
  fonts: Fonts,
  styles: Styles,

  components: {
    Button: ButtonTheme,
    Form: FormControlTheme,
    FormLabel: FormLabelTheme,
    Input: InputTheme
  }
})
