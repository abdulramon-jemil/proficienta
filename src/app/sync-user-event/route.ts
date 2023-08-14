import { NextResponse } from "next/server"
import { Webhook } from "svix"
import type { WebhookEvent } from "@clerk/clerk-sdk-node"

import { ENV_USER_SYNC_WEBHOOK_SIGNING_SECRET } from "@/controllers/server/env"
import { getSvixHeadersFromRequest } from "./base"
import { syncClerkUserCreation } from "./user-create"
import type { UserEventSyncResult } from "./base"
import { syncClerkUserUpdate } from "./user-update"

export async function POST(request: Request) {
  const body = await request.text()
  const headers = getSvixHeadersFromRequest(request)

  const wh = new Webhook(ENV_USER_SYNC_WEBHOOK_SIGNING_SECRET)

  let verifiedSuccessfully = false
  let message: unknown = null

  try {
    message = wh.verify(body, headers)
    verifiedSuccessfully = true
  } catch (error) {
    verifiedSuccessfully = false
  }

  if (!verifiedSuccessfully) {
    return NextResponse.json({ applied: false }, { status: 400 })
  }

  const payload =
    typeof message === "object"
      ? (message as WebhookEvent)
      : (JSON.parse(body) as WebhookEvent)

  let syncResult: UserEventSyncResult | null = null

  if (payload.type === "user.created")
    syncResult = await syncClerkUserCreation(payload.data)
  else if (payload.type === "user.updated")
    syncResult = await syncClerkUserUpdate(payload.data)
  // else if (payload.type === "user.deleted")
  //   syncResult = await syncClerkUserUpdate(payload.data)

  syncResult = syncResult as UserEventSyncResult

  return NextResponse.json(
    {},
    { status: syncResult.status === "success" ? 204 : 500 }
  )
}
