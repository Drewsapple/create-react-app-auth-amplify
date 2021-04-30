import React from 'react';
import './App.css';
import logo from './logo.svg';

import { uuid } from 'uuidv4';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api'
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'

import { listSignedInUsers } from './graphql/queries';
import { createSignedInUser, updateSignedInUser, deleteSignedInUser } from './graphql/mutations';
import { onCreateSignedInUser } from './graphql/subscriptions';


import aws_exports from './aws-exports';
import { ListSignedInUsersQuery } from './API';
import VisitorList from './components/VisitorList';

Amplify.configure(aws_exports);

interface CognitoUser {
  username: string
}

const todo = { name: "My first todo", description: "Hello world!" };


const AuthStateApp: React.FunctionComponent = () => {
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<CognitoUser>();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData as CognitoUser);
    });
  }, []);

  const getSignedIn = async () => (await (API.graphql({ query: listSignedInUsers }))) as GraphQLResult<ListSignedInUsersQuery>
  const currentSignins =  getSignedIn().then( result => result.data?.listSignedInUsers?.items);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <div>Hello, {user.username}</div>
      <br/>
      <div>
        <h2>Currently Signed in:</h2>
        <VisitorList visitors={currentSignins}/>
      </div>
      <AmplifySignOut />
    </div>
  ) : (
      <AmplifyAuthenticator>
        <AmplifySignUp
          headerText="Signup for CrowTrack Here"
          slot="sign-up"
          usernameAlias="username"
          formFields={[
            {
              label: "Full Name",
              required: true,
              placeholder: "Carl Ziegler",
              type: "name"
            },
            {
              label: 'Username',
              type: 'preferred_username',
              required: true,
              placeholder: 'Use your scroll if you can'
            },
            {
              label: 'Phone Number',
              type: 'phone_number',
              placeholder: 'Phone Number',
              required: true,
            },
            {
              label: 'Email',
              type: 'email',
              required: true,
              placeholder: 'Non-WPI Email',
            },
            {
              label: 'Password',
              type: 'password',
              required: true,
              placeholder: 'Password',
            }
          ]}
        ></AmplifySignUp>
      </AmplifyAuthenticator >
    );
}

export default AuthStateApp;