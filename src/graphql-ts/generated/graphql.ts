/* eslint-disable */
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z, is compliant with the date-time format outlined in section 5.6 of the RFC 3339
   * profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
   *
   * This scalar is a description of an exact instant on the timeline such as the instant that a user account was created.
   *
   * # Input Coercion
   *
   * When expected as an input type, only RFC 3339 compliant date-time strings are accepted. All other input values raise a query error indicating an incorrect type.
   *
   * # Result Coercion
   *
   * Where an RFC 3339 compliant date-time string has a time-zone other than UTC, it is shifted to UTC.
   * For example, the date-time string 2016-01-01T14:10:20+01:00 is shifted to 2016-01-01T13:10:20Z.
   */
  DateTime: { input: string; output: string; }
};

export type IdCollectionFilterInput = {
  in: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Mutation = {
  /** Create a UserProfile */
  userProfileCreate: Maybe<UserProfileCreatePayload>;
  /** Create multiple UserProfile */
  userProfileCreateMany: Maybe<UserProfileCreateManyPayload>;
  /** Delete a UserProfile by ID or unique field */
  userProfileDelete: Maybe<UserProfileDeletePayload>;
  /** Delete multiple UserProfile */
  userProfileDeleteMany: Maybe<UserProfileDeleteManyPayload>;
  /** Update a UserProfile */
  userProfileUpdate: Maybe<UserProfileUpdatePayload>;
  /** Update multiple UserProfile */
  userProfileUpdateMany: Maybe<UserProfileUpdateManyPayload>;
};


export type MutationUserProfileCreateArgs = {
  input: UserProfileCreateInput;
};


export type MutationUserProfileCreateManyArgs = {
  input: Array<UserProfileCreateManyInput>;
};


export type MutationUserProfileDeleteArgs = {
  by: UserProfileByInput;
};


export type MutationUserProfileDeleteManyArgs = {
  input: Array<UserProfileDeleteManyInput>;
};


export type MutationUserProfileUpdateArgs = {
  by: UserProfileByInput;
  input: UserProfileUpdateInput;
};


export type MutationUserProfileUpdateManyArgs = {
  input: Array<UserProfileUpdateManyInput>;
};

export enum OrderByDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageInfo = {
  endCursor: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Maybe<Scalars['String']['output']>;
};

export type Query = {
  /** Query a single UserProfile by an ID or a unique field */
  userProfile: Maybe<UserProfile>;
  /** Paginated query to fetch the whole list of `UserProfile`. */
  userProfileCollection: Maybe<UserProfileConnection>;
};


export type QueryUserProfileArgs = {
  by: UserProfileByInput;
};


export type QueryUserProfileCollectionArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  filter: InputMaybe<UserProfileCollectionFilterInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<UserProfileOrderByInput>;
};

export type UserProfile = {
  clerkId: Scalars['ID']['output'];
  /** when the model was created */
  createdAt: Scalars['DateTime']['output'];
  firstName: Scalars['String']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  /** when the model was updated */
  updatedAt: Scalars['DateTime']['output'];
};

export type UserProfileByInput = {
  clerkId: InputMaybe<Scalars['ID']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
};

export type UserProfileCollectionFilterInput = {
  id: InputMaybe<IdCollectionFilterInput>;
};

export type UserProfileConnection = {
  edges: Maybe<Array<Maybe<UserProfileEdge>>>;
  /** Information to aid in pagination */
  pageInfo: PageInfo;
};

/** Input to create a UserProfile */
export type UserProfileCreateInput = {
  clerkId: Scalars['ID']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type UserProfileCreateManyInput = {
  input: UserProfileCreateInput;
};

export type UserProfileCreateManyPayload = {
  userProfileCollection: Array<UserProfile>;
};

export type UserProfileCreatePayload = {
  userProfile: Maybe<UserProfile>;
};

export type UserProfileDeleteManyInput = {
  by: UserProfileByInput;
};

export type UserProfileDeleteManyPayload = {
  deletedIds: Array<Scalars['ID']['output']>;
};

export type UserProfileDeletePayload = {
  deletedId: Scalars['ID']['output'];
};

export type UserProfileEdge = {
  cursor: Scalars['String']['output'];
  node: UserProfile;
};

export type UserProfileOrderByInput = {
  createdAt: InputMaybe<OrderByDirection>;
};

/** Input to update a UserProfile */
export type UserProfileUpdateInput = {
  clerkId: InputMaybe<Scalars['ID']['input']>;
  firstName: InputMaybe<Scalars['String']['input']>;
  lastName: InputMaybe<Scalars['String']['input']>;
};

export type UserProfileUpdateManyInput = {
  by: UserProfileByInput;
  input: UserProfileUpdateInput;
};

export type UserProfileUpdateManyPayload = {
  userProfileCollection: Array<UserProfile>;
};

export type UserProfileUpdatePayload = {
  userProfile: Maybe<UserProfile>;
};

export type FirstTenUserProfilesQueryVariables = Exact<{
  count: Scalars['Int']['input'];
}>;


export type FirstTenUserProfilesQuery = { userProfileCollection: { edges: Array<{ node: { firstName: string, lastName: string } } | null> | null } | null };

export type UserDetailsFragment = { id: string, firstName: string, lastName: string } & { ' $fragmentName'?: 'UserDetailsFragment' };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const UserDetailsFragmentDoc = new TypedDocumentString(`
    fragment UserDetails on UserProfile {
  id
  firstName
  lastName
}
    `, {"fragmentName":"UserDetails"}) as unknown as TypedDocumentString<UserDetailsFragment, unknown>;
export const FirstTenUserProfilesDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<FirstTenUserProfilesQuery, FirstTenUserProfilesQueryVariables>;