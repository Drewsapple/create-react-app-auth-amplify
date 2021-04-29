/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateLoggedVisitInput = {
  id?: string | null,
  name?: string | null,
  signin?: string | null,
  signout?: string | null,
  contacts?: Array< string | null > | null,
  location?: string | null,
};

export type ModelLoggedVisitConditionInput = {
  name?: ModelStringInput | null,
  signin?: ModelStringInput | null,
  signout?: ModelStringInput | null,
  contacts?: ModelStringInput | null,
  location?: ModelStringInput | null,
  and?: Array< ModelLoggedVisitConditionInput | null > | null,
  or?: Array< ModelLoggedVisitConditionInput | null > | null,
  not?: ModelLoggedVisitConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type LoggedVisit = {
  __typename: "LoggedVisit",
  id?: string,
  name?: string | null,
  signin?: string | null,
  signout?: string | null,
  contacts?: Array< string | null > | null,
  location?: string | null,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateLoggedVisitInput = {
  id: string,
  name?: string | null,
  signin?: string | null,
  signout?: string | null,
  contacts?: Array< string | null > | null,
  location?: string | null,
};

export type DeleteLoggedVisitInput = {
  id?: string | null,
};

export type CreateSignedInUserInput = {
  id?: string | null,
  name: string,
  signin?: string | null,
  location?: string | null,
};

export type ModelSignedInUserConditionInput = {
  name?: ModelStringInput | null,
  signin?: ModelStringInput | null,
  location?: ModelStringInput | null,
  and?: Array< ModelSignedInUserConditionInput | null > | null,
  or?: Array< ModelSignedInUserConditionInput | null > | null,
  not?: ModelSignedInUserConditionInput | null,
};

export type SignedInUser = {
  __typename: "SignedInUser",
  id?: string,
  name?: string,
  signin?: string | null,
  location?: string | null,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateSignedInUserInput = {
  id: string,
  name?: string | null,
  signin?: string | null,
  location?: string | null,
};

export type DeleteSignedInUserInput = {
  id?: string | null,
};

export type ModelLoggedVisitFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  signin?: ModelStringInput | null,
  signout?: ModelStringInput | null,
  contacts?: ModelStringInput | null,
  location?: ModelStringInput | null,
  and?: Array< ModelLoggedVisitFilterInput | null > | null,
  or?: Array< ModelLoggedVisitFilterInput | null > | null,
  not?: ModelLoggedVisitFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelLoggedVisitConnection = {
  __typename: "ModelLoggedVisitConnection",
  items?:  Array<LoggedVisit | null > | null,
  nextToken?: string | null,
};

export type ModelSignedInUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  signin?: ModelStringInput | null,
  location?: ModelStringInput | null,
  and?: Array< ModelSignedInUserFilterInput | null > | null,
  or?: Array< ModelSignedInUserFilterInput | null > | null,
  not?: ModelSignedInUserFilterInput | null,
};

export type ModelSignedInUserConnection = {
  __typename: "ModelSignedInUserConnection",
  items?:  Array<SignedInUser | null > | null,
  nextToken?: string | null,
};

export type CreateLoggedVisitMutationVariables = {
  input?: CreateLoggedVisitInput,
  condition?: ModelLoggedVisitConditionInput | null,
};

export type CreateLoggedVisitMutation = {
  createLoggedVisit?:  {
    __typename: "LoggedVisit",
    id: string,
    name?: string | null,
    signin?: string | null,
    signout?: string | null,
    contacts?: Array< string | null > | null,
    location?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateLoggedVisitMutationVariables = {
  input?: UpdateLoggedVisitInput,
  condition?: ModelLoggedVisitConditionInput | null,
};

export type UpdateLoggedVisitMutation = {
  updateLoggedVisit?:  {
    __typename: "LoggedVisit",
    id: string,
    name?: string | null,
    signin?: string | null,
    signout?: string | null,
    contacts?: Array< string | null > | null,
    location?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteLoggedVisitMutationVariables = {
  input?: DeleteLoggedVisitInput,
  condition?: ModelLoggedVisitConditionInput | null,
};

export type DeleteLoggedVisitMutation = {
  deleteLoggedVisit?:  {
    __typename: "LoggedVisit",
    id: string,
    name?: string | null,
    signin?: string | null,
    signout?: string | null,
    contacts?: Array< string | null > | null,
    location?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSignedInUserMutationVariables = {
  input?: CreateSignedInUserInput,
  condition?: ModelSignedInUserConditionInput | null,
};

export type CreateSignedInUserMutation = {
  createSignedInUser?:  {
    __typename: "SignedInUser",
    id: string,
    name: string,
    signin?: string | null,
    location?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSignedInUserMutationVariables = {
  input?: UpdateSignedInUserInput,
  condition?: ModelSignedInUserConditionInput | null,
};

export type UpdateSignedInUserMutation = {
  updateSignedInUser?:  {
    __typename: "SignedInUser",
    id: string,
    name: string,
    signin?: string | null,
    location?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSignedInUserMutationVariables = {
  input?: DeleteSignedInUserInput,
  condition?: ModelSignedInUserConditionInput | null,
};

export type DeleteSignedInUserMutation = {
  deleteSignedInUser?:  {
    __typename: "SignedInUser",
    id: string,
    name: string,
    signin?: string | null,
    location?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetLoggedVisitQueryVariables = {
  id?: string,
};

export type GetLoggedVisitQuery = {
  getLoggedVisit?:  {
    __typename: "LoggedVisit",
    id: string,
    name?: string | null,
    signin?: string | null,
    signout?: string | null,
    contacts?: Array< string | null > | null,
    location?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListLoggedVisitsQueryVariables = {
  filter?: ModelLoggedVisitFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLoggedVisitsQuery = {
  listLoggedVisits?:  {
    __typename: "ModelLoggedVisitConnection",
    items?:  Array< {
      __typename: "LoggedVisit",
      id: string,
      name?: string | null,
      signin?: string | null,
      signout?: string | null,
      contacts?: Array< string | null > | null,
      location?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetSignedInUserQueryVariables = {
  id?: string,
};

export type GetSignedInUserQuery = {
  getSignedInUser?:  {
    __typename: "SignedInUser",
    id: string,
    name: string,
    signin?: string | null,
    location?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSignedInUsersQueryVariables = {
  filter?: ModelSignedInUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSignedInUsersQuery = {
  listSignedInUsers?:  {
    __typename: "ModelSignedInUserConnection",
    items?:  Array< {
      __typename: "SignedInUser",
      id: string,
      name: string,
      signin?: string | null,
      location?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateLoggedVisitSubscription = {
  onCreateLoggedVisit?:  {
    __typename: "LoggedVisit",
    id: string,
    name?: string | null,
    signin?: string | null,
    signout?: string | null,
    contacts?: Array< string | null > | null,
    location?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateLoggedVisitSubscription = {
  onUpdateLoggedVisit?:  {
    __typename: "LoggedVisit",
    id: string,
    name?: string | null,
    signin?: string | null,
    signout?: string | null,
    contacts?: Array< string | null > | null,
    location?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteLoggedVisitSubscription = {
  onDeleteLoggedVisit?:  {
    __typename: "LoggedVisit",
    id: string,
    name?: string | null,
    signin?: string | null,
    signout?: string | null,
    contacts?: Array< string | null > | null,
    location?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSignedInUserSubscription = {
  onCreateSignedInUser?:  {
    __typename: "SignedInUser",
    id: string,
    name: string,
    signin?: string | null,
    location?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSignedInUserSubscription = {
  onUpdateSignedInUser?:  {
    __typename: "SignedInUser",
    id: string,
    name: string,
    signin?: string | null,
    location?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSignedInUserSubscription = {
  onDeleteSignedInUser?:  {
    __typename: "SignedInUser",
    id: string,
    name: string,
    signin?: string | null,
    location?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
