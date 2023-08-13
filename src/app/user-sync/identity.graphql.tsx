import { graphql, getFragmentData, type FragmentType } from "@/graphql"

export const query = graphql(/* GraphQL */ `
  query FirstTenUserProfiles($count: Int!) {
    userProfileCollection(first: $count) {
      edges {
        node {
          firstName
          lastName
        }
      }
    }
  }
`)

export const UserFragment = graphql(/* GraphQL */ `
  fragment UserDetails on UserProfile {
    id
    firstName
    lastName
  }
`)

function Film({
  userDetails
}: {
  userDetails: FragmentType<typeof UserFragment>
}) {
  const details = getFragmentData(UserFragment, userDetails)
  return <div>{details.id}</div>
}

export default Film
