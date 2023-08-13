import { NextResponse } from "next/server"
import { authMiddleware } from "@clerk/nextjs"
import {
  AUTH_VERIFICATION_PAGE,
  ENROLLMENTS_PAGE,
  SIGN_IN_PAGE,
  SIGN_UP_PAGE
} from "./constants/pages"
import { getDistinctNextURL } from "./controllers/shared/next-url"

const publicPages = [AUTH_VERIFICATION_PAGE]
const guestAuthPages = [SIGN_IN_PAGE, SIGN_UP_PAGE]

export const middleware = authMiddleware({
  publicRoutes: publicPages,
  afterAuth(auth, req) {
    const requestedPath = req.nextUrl.pathname

    // Redirect user to appropriate page if they're signed in already
    if (guestAuthPages.includes(requestedPath) && auth.userId) {
      return NextResponse.redirect(
        getDistinctNextURL(requestedPath, ENROLLMENTS_PAGE, true)
      )
    }

    return NextResponse.next()
  }
})

export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico|icon.svg).*)"
}
