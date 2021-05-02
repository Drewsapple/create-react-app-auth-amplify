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
  TextField,
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
      secure: process.env.NODE_ENV !== 'development',
    }
  },
  "aws_appsync_authenticationType": aws_exports.aws_appsync_authenticationType,
  "aws_appsync_graphqlEndpoint": aws_exports.aws_appsync_graphqlEndpoint,
  "aws_appsync_region": aws_exports.aws_appsync_region,
});


const AuthStateApp: React.FunctionComponent = () => {
  const [authState, setAuthState] = React.useState<AuthState>(AuthState.SignedIn);
  const [user, setUser] = React.useState<CognitoUser>();
  const [formData, setFormData] = React.useState({
    name: "",
    username: "",
    password: "",
    phone_number: "",
    email: "",
    verificationCode: "",
  });

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
  }, [])


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


  /* onChange handler for form inputs */
  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        username: formData.username,
        password: formData.password,
        attributes: {
          preferred_username: formData.username,
          name: formData.name,
          email: formData.email,
          phone_number: formData.phone_number,
        },
      });
      /* Once the user successfully signs up, update form state to show the confirm sign up form for MFA */
      setAuthState(AuthState.ConfirmSignUp);
    } catch (err) {
      console.log({ err });
    }
  }

  function validatePhoneForE164(phoneNumber) {
    const regEx = /^\+[1-9]\d{10,14}$/;

    return regEx.test(phoneNumber);
};

  /* Confirm sign up function for MFA */
  async function confirmSignUp() {
    try {
      console.log(formData);
      console.log("Confirming signup for " + formData.username);
      console.log(
        await Auth.confirmSignUp(
          formData.username,
          formData.verificationCode
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
      console.log('attempting signin for ' + formData.username)
      let user = await Auth.signIn(formData.username, formData.password)
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
                      <TextField
                        key="userFormField"
                        label="Username/Scroll"
                        name="username"
                        onChange={onChange}
                      />
                      <TextField
                        key="passwordFormField"
                        label="Password"
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
                      <TextField
                        key="userFormField"
                        label="Username/Scroll"
                        name="username"
                        onChange={onChange}
                      />
                      <TextField
                        key="verificationFormField"
                        label="Verification Code"
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
                      <TextField
                        key="nameFormField"
                        label="Full Name"
                        name="name"
                        inputProps={{ "aria-label": "username" }}
                        onChange={onChange}
                      />
                      <TextField
                        key="userFormField"
                        label="Username/Scroll"
                        name="username"
                        inputProps={{ "aria-label": "username" }}
                        onChange={onChange}
                      />
                      <TextField
                        error={8 > formData.password.length}
                        key="passwordFormField"
                        label="Password"
                        name="password"
                        type="password"
                        helperText="Must be at least 8 characters"
                        onChange={onChange}
                      />
                      <TextField
                        error={!validatePhoneForE164(formData.phone_number)}
                        name="phone_number"
                        id="standard-error-helper-text"
                        label="Phone"
                        onChange={onChange}
                        helperText="ex. +15085551234"
                      />
                      {/* <Input
                        placeholder="Phone ex. +15085551234"
                        name="phone_number"
                        type="tel"
                        inputProps={{ "aria-label": "phone number" }}
                        onChange={onChange}
                      /> */}
                      <TextField
                        key="emailFormField"
                        label="Non-WPI email address"
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
