import { NextResponse } from "next/server"
import { Webhook } from "svix"

import { ENV_USER_SYNC_WEBHOOK_SIGNING_SECRET } from "@/controllers/server/env"
import { getSvixHeadersFromRequest } from "./base"

export async function POST(request: Request) {
  const body = await request.text()
  const headers = getSvixHeadersFromRequest(request)

  const wh = new Webhook(ENV_USER_SYNC_WEBHOOK_SIGNING_SECRET)

  let verifiedSuccessfully = false
  let message: unknown

  try {
    message = wh.verify(body, headers)
    verifiedSuccessfully = true
  } catch (error) {
    verifiedSuccessfully = false
  }

  // eslint-disable-next-line no-console
  console.log(message as string)

  return NextResponse.json({ applied: verifiedSuccessfully })
}
