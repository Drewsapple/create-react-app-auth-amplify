/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLoggedVisit = /* GraphQL */ `
  query GetLoggedVisit($id: ID!) {
    getLoggedVisit(id: $id) {
      id
      name
      signin
      signout
      contacts
      location
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
        name
        signin
        signout
        contacts
        location
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
      name
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
        name
        signin
        location
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
