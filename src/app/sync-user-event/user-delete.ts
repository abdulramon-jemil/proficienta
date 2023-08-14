import { request } from "graphql-request"
import type { DeletedObjectJSON } from "@clerk/clerk-sdk-node"

import { PUBLIC_ENV_GRAFBASE_API_URL } from "@/controllers/shared/env"
import { ENV_SERVER_GRAFBASE_API_KEY } from "@/controllers/server/env"
import { ClerkUserDeletionSyncDocument } from "./user-sync.graphql"
import type { UserEventSyncResult } from "./base"

export async function syncClerkUserDeletion(
  user: DeletedObjectJSON
): Promise<UserEventSyncResult> {
  try {
    await request({
      url: PUBLIC_ENV_GRAFBASE_API_URL,
      document: ClerkUserDeletionSyncDocument,
      requestHeaders: {
        "x-api-key": ENV_SERVER_GRAFBASE_API_KEY
      },
      variables: {
        clerkId: user.id as string
      }
    })

    return { status: "success" }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to sync user deletion")
    return { status: "failed" }
  }
}
