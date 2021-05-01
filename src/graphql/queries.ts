/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLoggedVisit = /* GraphQL */ `
  query GetLoggedVisit($id: ID!) {
    getLoggedVisit(id: $id) {
      id
      user
      signin
      signout
      location
      contacts
      createdAt
      updatedAt
    }
  }
`;
export const listLoggedVisits = /* GraphQL */ `
  query ListLoggedVisits(
    $filter: ModelLoggedVisitFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLoggedVisits(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        signin
        signout
        location
        contacts
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSignedInUser = /* GraphQL */ `
  query GetSignedInUser($id: ID!) {
    getSignedInUser(id: $id) {
      id
      user
      signin
      location
      createdAt
      updatedAt
    }
  }
`;
export const listSignedInUsers = /* GraphQL */ `
  query ListSignedInUsers(
    $filter: ModelSignedInUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSignedInUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        signin
        location
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
