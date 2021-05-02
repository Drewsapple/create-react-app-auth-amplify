import React from "react";
import "./App.css";
//import logo from './logo.svg';

import Amplify, { Auth, Hub } from "aws-amplify";
import { CognitoUser } from "amazon-cognito-identity-js"
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

import { AppContext } from "./libs/contextLib";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Container,
  IconButton,
  Input,
  Paper,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
//import { Header, Footer, HeaderLinks, GridItem, GridContainer, CardBody, CardHeader, CardFooter, CustomInput} from 'material-kit-react'


import aws_exports from "./aws-exports";
import CurrentVisitors from "./components/CurrentVisitors";
import LoggedVisits from "./components/LoggedVisits";

Amplify.configure({
  Auth: {
    identityPoolId: aws_exports.identityPoolId,
    region: aws_exports.aws_cognito_region,
    identityPoolRegion: aws_exports.aws_cognito_region,
    userPoolId: aws_exports.aws_user_pools_id,
    userPoolWebClientId: aws_exports.aws_user_pools_web_client_id,
    mandatorySignIn: true,
    cookieStorage: {
      domain: 'tracking.boop.sh',
      path: '/',
      expires: 365,
    }
  },
  "aws_appsync_authenticationType": aws_exports.aws_appsync_authenticationType,
  "aws_appsync_graphqlEndpoint": aws_exports.aws_appsync_graphqlEndpoint,
  "aws_appsync_region": aws_exports.aws_appsync_region,
});


const AuthStateApp: React.FunctionComponent = () => {
  const [authState, setAuthState] = React.useState<AuthState>(AuthState.SignedIn);
  const [user, setUser] = React.useState<CognitoUser>();

  React.useEffect(() => {
    setAuthState(AuthState.SignUp);
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData as CognitoUser);
    });
  }, []);

  React.useEffect(() => {
    Auth.currentAuthenticatedUser().then( (value) => {
      setUser(value.attributes);
    })
  }, [user])


  React.useEffect(() => {
    Hub.listen('auth', (data) => {
      const { payload } = data
      console.log('A new auth event has happened: ', data)
       if (payload.event === 'signIn') {
         console.log('a user has signed in!')
       }
       if (payload.event === 'signOut') {
         console.log('a user has signed out!')
       }
    })
  }, [])

  /* Create the form state and form input state */
  let formInputState = {
    name: "",
    username: "",
    password: "",
    phone_number: "",
    email: "",
    verificationCode: "",
  };

  /* onChange handler for form inputs */
  function onChange(e) {
    formInputState = { ...formInputState, [e.target.name]: e.target.value };
  }

  /* onAppLoad handler for state init */
  async function onAppLoad() {
    const user = await Auth.currentAuthenticatedUser();
    console.log("user:", user);
    if (user) {
      setAuthState(AuthState.SignedIn);
    } else {
      setAuthState(AuthState.SignUp);
    }
  }

  /* Sign up function */
  async function signUp() {
    try {
      await Auth.signUp({
        username: formInputState.username,
        password: formInputState.password,
        attributes: {
          preferred_username: formInputState.username,
          name: formInputState.name,
          email: formInputState.email,
          phone_number: formInputState.phone_number,
        },
      });
      /* Once the user successfully signs up, update form state to show the confirm sign up form for MFA */
      setAuthState(AuthState.ConfirmSignUp);
    } catch (err) {
      console.log({ err });
    }
  }

  /* Confirm sign up function for MFA */
  async function confirmSignUp() {
    try {
      console.log(formInputState);
      console.log("Confirming signup for " + formInputState.username);
      console.log(
        await Auth.confirmSignUp(
          formInputState.username,
          formInputState.verificationCode
        )
      );
      /* Once the user successfully confirms their account, update form state to show the sign in form*/
      setAuthState(AuthState.SignIn);
    } catch (err) {
      console.log({ err });
    }
  }

  /* Sign in function */
  async function signIn() {
    try {
      console.log('attempting signin')
      let user = await Auth.signIn(formInputState.username, formInputState.password)
      console.log(user)
      setUser(user);
      /* Once the user successfully signs in, update the form state to show the signed in state */
      setAuthState(AuthState.SignedIn);
    } catch (err) {
      if (err.code === "UserNotConfirmedException")
        setAuthState(AuthState.ConfirmSignUp);
      else console.log({ err });
    }
  }

  /* Sign in function */
  async function signOut() {
    try {
      await Auth.signOut();
      setUser(undefined);
      /* Once the user successfully signs in, update the form state to show the signed in state */
      setAuthState(AuthState.SignedOut);
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <AppContext.Provider value={{authState, setAuthState}}>
    <div className="App">
          <AppContext.Consumer>
          {(appContext) => {
            console.log("Context passed down:")
            console.log(appContext)
            switch (authState) {
              case AuthState.SignedIn:
                if(!user) {setAuthState(AuthState.SignedOut); break;}
                else {
                return (
                  <>
                    <AppBar position="static">
                      <Toolbar>
                        <IconButton
                          edge="start"
                          className="menuButton"
                          color="inherit"
                          aria-label="menu"
                        ></IconButton>
                        <Typography variant="h6" className="title">
                          Hello, {user.getUsername()}
                        </Typography>
                        <Button variant="outlined" onClick={signOut}>
                          Log Out
                        </Button>
                      </Toolbar>
                    </AppBar>
                    <br />
                    <CurrentVisitors user={user} />
                    <LoggedVisits />
                  </>
                );}
              case AuthState.SignIn:
              case AuthState.SignedOut:
                return (
                  <div
                    style={{
                      textAlign: "center",
                      display: "grid",
                      justifyContent: "center",
                    }}
                  >
                    <Paper color='white' elevation={2}>
                      <h2>Sign In</h2>
                      <Input
                        key="userFormField"
                        placeholder="Username/Scroll"
                        name="username"
                        onChange={onChange}
                      />
                      <Input
                        key="passwordFormField"
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={onChange}
                      />
                      <Container maxWidth="sm">
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={signIn}
                        >
                          Sign In
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => {
                            console.log(authState);
                            setAuthState(AuthState.SignUp);
                            console.log(authState);
                          }}
                        >
                          Sign Up
                        </Button>
                      </Container>
                    </Paper>
                  </div>
                );
              case AuthState.ConfirmSignUp:
                return (
                  <div
                    style={{
                      textAlign: "center",
                      display: "grid",
                      justifyContent: "center",
                    }}
                  >
                    <Paper elevation={2}>
                      <h2>Confirm Signup via SMS</h2>
                      <Input
                        key="userFormField"
                        placeholder="Username/Scroll"
                        name="username"
                        onChange={onChange}
                      />
                      <Input
                        key="verificationFormField"
                        placeholder="Verification Code"
                        name="verificationCode"
                        onChange={onChange}
                      />
                      <Container maxWidth="sm">
                        <Button variant="outlined" onClick={confirmSignUp}>
                          Confirm Sign Up
                        </Button>
                      </Container>
                    </Paper>
                  </div>
                );
              case AuthState.SignUp:
              default:
                return (
                  <div
                    style={{
                      textAlign: "center",
                      display: "grid",
                      justifyContent: "center",
                    }}
                  >
                    <Paper elevation={2}>
                      <h2>Sign Up</h2>
                      <Input
                        key="nameFormField"
                        placeholder="Full Name"
                        name="name"
                        inputProps={{ "aria-label": "username" }}
                        onChange={onChange}
                      />
                      <Input
                        key="userFormField"
                        placeholder="Username/Scroll"
                        name="username"
                        inputProps={{ "aria-label": "username" }}
                        onChange={onChange}
                      />
                      <Input
                        key="passwordFormField"
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={onChange}
                      />
                      <Input
                        placeholder="Phone ex. +15085551234"
                        name="phone_number"
                        type="tel"
                        inputProps={{ "aria-label": "phone number" }}
                        onChange={onChange}
                      />
                      <Input
                        key="emailFormField"
                        placeholder="Non-WPI email address"
                        name="email"
                        onChange={onChange}
                      />
                      <Container maxWidth="sm">
                        <Button onClick={signUp}>Sign Up</Button>
                        <Button onClick={() => setAuthState(AuthState.SignIn)}>
                          Sign In
                        </Button>
                      </Container>
                    </Paper>
                  </div>
                );
            }
          }}
          </AppContext.Consumer>
    </div>
    </AppContext.Provider>
  );
};

export default AuthStateApp;
