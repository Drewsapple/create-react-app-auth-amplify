/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLoggedVisit = /* GraphQL */ `
  mutation CreateLoggedVisit(
    $input: CreateLoggedVisitInput!
    $condition: ModelLoggedVisitConditionInput
  ) {
    createLoggedVisit(input: $input, condition: $condition) {
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
export const updateLoggedVisit = /* GraphQL */ `
  mutation UpdateLoggedVisit(
    $input: UpdateLoggedVisitInput!
    $condition: ModelLoggedVisitConditionInput
  ) {
    updateLoggedVisit(input: $input, condition: $condition) {
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
export const deleteLoggedVisit = /* GraphQL */ `
  mutation DeleteLoggedVisit(
    $input: DeleteLoggedVisitInput!
    $condition: ModelLoggedVisitConditionInput
  ) {
    deleteLoggedVisit(input: $input, condition: $condition) {
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
export const createSignedInUser = /* GraphQL */ `
  mutation CreateSignedInUser(
    $input: CreateSignedInUserInput!
    $condition: ModelSignedInUserConditionInput
  ) {
    createSignedInUser(input: $input, condition: $condition) {
      id
      user
      signin
      location
      contacts
      createdAt
      updatedAt
    }
  }
`;
export const updateSignedInUser = /* GraphQL */ `
  mutation UpdateSignedInUser(
    $input: UpdateSignedInUserInput!
    $condition: ModelSignedInUserConditionInput
  ) {
    updateSignedInUser(input: $input, condition: $condition) {
      id
      user
      signin
      location
      contacts
      createdAt
      updatedAt
    }
  }
`;
export const deleteSignedInUser = /* GraphQL */ `
  mutation DeleteSignedInUser(
    $input: DeleteSignedInUserInput!
    $condition: ModelSignedInUserConditionInput
  ) {
    deleteSignedInUser(input: $input, condition: $condition) {
      id
      user
      signin
      location
      contacts
      createdAt
      updatedAt
    }
  }
`;
