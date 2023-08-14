import { request } from "graphql-request"
import type { UserJSON } from "@clerk/clerk-sdk-node"

import { PUBLIC_ENV_GRAFBASE_API_URL } from "@/controllers/shared/env"
import { ENV_SERVER_GRAFBASE_API_KEY } from "@/controllers/server/env"
import { ClerkUserUpdateSyncDocument } from "./user-sync.graphql"
import type { UserEventSyncResult } from "./base"

export async function syncClerkUserUpdate(
  user: UserJSON
): Promise<UserEventSyncResult> {
  try {
    await request({
      url: PUBLIC_ENV_GRAFBASE_API_URL,
      document: ClerkUserUpdateSyncDocument,
      requestHeaders: {
        "x-api-key": ENV_SERVER_GRAFBASE_API_KEY
      },
      variables: {
        firstName: user.first_name,
        lastName: user.last_name,
        clerkId: user.id
      }
    })

    return { status: "success" }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to sync user update")
    return { status: "failed" }
  }
}
