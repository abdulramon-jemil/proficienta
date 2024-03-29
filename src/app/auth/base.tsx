import { isClerkAPIResponseError } from "@clerk/nextjs"
import { ENROLLMENTS_PAGE } from "@/constants/pages"

export const AUTH_PAGE_DEFAULT_REDIRECT_URL = ENROLLMENTS_PAGE
// In case you want to delay before redirecting after auth
export const AUTH_PAGE_REDIRECT_DELAY_MS = 2000

export function getAuthErrorMessageWithFallback(
  error: unknown,
  fallback: string
) {
  if (isClerkAPIResponseError(error)) return error.errors[0].message
  return fallback
}
