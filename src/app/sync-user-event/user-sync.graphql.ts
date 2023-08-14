import { graphql } from "@/graphql"

export const ClerkUserCreationSyncDocument = graphql(/* GraphQL */ `
  mutation SyncClerkUserCreation(
    $clerkId: ID!
    $firstName: String!
    $lastName: String!
  ) {
    userCreate(
      input: { clerkId: $clerkId, firstName: $firstName, lastName: $lastName }
    ) {
      user {
        id
      }
    }
  }
`)

export const ClerkUserUpdateSyncDocument = graphql(/* GraphQL */ `
  mutation SyncClerkUserUpdate(
    $clerkId: ID!
    $firstName: String!
    $lastName: String!
  ) {
    userUpdate(
      by: { clerkId: $clerkId }
      input: { firstName: $firstName, lastName: $lastName }
    ) {
      user {
        id
      }
    }
  }
`)

export const ClerkUserDeletionSyncDocument = graphql(/* GraphQL */ `
  mutation SyncClerkUserDeletion($clerkId: ID!) {
    userUpdate(by: { clerkId: $clerkId }, input: { isDeleted: true }) {
      user {
        id
      }
    }
  }
`)
