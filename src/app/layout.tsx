import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/site"
import { Providers } from "./providers"

export const metadata = {
  title: `${SITE_NAME} | ${SITE_DESCRIPTION}`,
  description: SITE_DESCRIPTION
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
