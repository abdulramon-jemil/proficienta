import { SITE_NAME } from "@/constants/site"

export const metadata = {
  title: `Email Verification Check | ${SITE_NAME}`
}

export default function EmailVerificationSetupPageLayout({
  children
}: {
  children: React.ReactNode
}) {
  return children
}
