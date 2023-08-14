// eslint-disable-next-line import/no-extraneous-dependencies
import { g } from "@grafbase/sdk"

export const userProfile = g.model("UserProfile", {
  clerkId: g.id().unique(),
  firstName: g.string(),
  lastName: g.string(),
  isDeleted: g.boolean().default(false)
})
