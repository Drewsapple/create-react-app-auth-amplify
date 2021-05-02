import React from 'react';
import './App.css';
import logo from './logo.svg';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api'
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'

import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'

import { listSignedInUsers } from './graphql/queries';
import { createSignedInUser, updateSignedInUser, deleteSignedInUser } from './graphql/mutations';
import { onCreateSignedInUser } from './graphql/subscriptions';


import aws_exports from './aws-exports';
import { CreateSignedInUserInput, ListSignedInUsersQuery } from './API';
import moment from 'moment';
import CurrentVisitors from './components/CurrentVisitors';
import LoggedVisits from './components/LoggedVisits';

Amplify.configure(aws_exports);

interface CognitoUser {
  username: string,
  attributes: {
    email: string,
    name: string,
    phone_number: string,
  }
}

const AuthStateApp: React.FunctionComponent = () => {
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<CognitoUser>();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData as CognitoUser);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className="title">
            Hello, {user.username}
          </Typography>
          <AmplifySignOut />
        </Toolbar>
      </AppBar>
      <br/>
      <CurrentVisitors user={user}/>
      <LoggedVisits />
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