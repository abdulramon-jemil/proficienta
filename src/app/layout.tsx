import { ClerkProvider } from "@clerk/nextjs"
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/site"
import { Providers } from "./providers"

export const metadata = {
  title: `${SITE_DESCRIPTION} | ${SITE_NAME}`,
  description: SITE_DESCRIPTION
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
