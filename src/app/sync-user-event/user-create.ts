import type { UserJSON } from "@clerk/clerk-sdk-node"

// eslint-disable-next-line @typescript-eslint/require-await
export async function syncClerkUserCreation(user: UserJSON) {
  // eslint-disable-next-line no-console
  console.log(user)
}
