import { graphql } from "@/graphql"

export const ClerkUserCreationSyncDocument = graphql(/* GraphQL */ `
  mutation SyncClerkUserProfileCreation(
    $clerkId: ID!
    $firstName: String!
    $lastName: String!
  ) {
    userProfileCreate(
      input: { clerkId: $clerkId, firstName: $firstName, lastName: $lastName }
    ) {
      userProfile {
        id
      }
    }
  }
`)

export const ClerkUserUpdateSyncDocument = graphql(/* GraphQL */ `
  mutation SyncClerkUserProfileUpdate(
    $clerkId: ID!
    $firstName: String!
    $lastName: String!
  ) {
    userProfileUpdate(
      by: { clerkId: $clerkId }
      input: { firstName: $firstName, lastName: $lastName }
    ) {
      userProfile {
        id
      }
    }
  }
`)

export const ClerkUserDeletionSyncDocument = graphql(/* GraphQL */ `
  mutation SyncClerkUserProfileDeletion($clerkId: ID!) {
    userProfileUpdate(by: { clerkId: $clerkId }, input: { isDeleted: true }) {
      userProfile {
        id
      }
    }
  }
`)
