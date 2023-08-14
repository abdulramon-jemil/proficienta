// import { graphql, getFragmentData, type FragmentType } from "@/graphql"
import { graphql } from "@/graphql"

export const SyncClerkUserCreationDocument = graphql(/* GraphQL */ `
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

// export const UserFragment = graphql(/* GraphQL */ `
//   fragment UserDetails on UserProfile {
//     id
//     firstName
//     lastName
//   }
// `)

// function Film({
//   userDetails
// }: {
//   userDetails: FragmentType<typeof UserFragment>
// }) {
//   const details = getFragmentData(UserFragment, userDetails)
//   return <div>{details.id}</div>
// }

// export default Film
