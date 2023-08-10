import { Inter } from "next/font/google"

const inter = Inter({
  display: "swap",
  subsets: ["latin"]
})

export const Fonts = {
  heading: inter.style.fontFamily,
  body: inter.style.fontFamily
}
