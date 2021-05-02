import React from 'react';
import './App.css';
//import logo from './logo.svg';

import Amplify, { Auth } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'

import { AppBar, Button, IconButton, Input, Paper, Toolbar, Typography } from '@material-ui/core'


import aws_exports from './aws-exports';
import CurrentVisitors from './components/CurrentVisitors';
import LoggedVisits from './components/LoggedVisits';

Amplify.configure(aws_exports)

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
    setAuthState(AuthState.SignUp);
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData as CognitoUser);
    });
  }, []);

  React.useEffect(() => {
    console.log(Auth.currentSession())
  }, [authState])

  /* Create the form state and form input state */
  let formInputState = { fullname: '', username: '', password: '', phone_number: '', email: '', verificationCode: '' };

  /* onChange handler for form inputs */
  function onChange(e) {
    formInputState = { ...formInputState, [e.target.name]: e.target.value };
  }

  /* onAppLoad handler for state init */
  async function onAppLoad() {
      const user = await Auth.currentAuthenticatedUser();
      console.log('user:', user)
      if (user) {
        setAuthState(AuthState.SignedIn)
      } else {
        setAuthState(AuthState.SignUp)
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
          name: formInputState.fullname,
          email: formInputState.email,
          phone_number: formInputState.phone_number,
        }});
      /* Once the user successfully signs up, update form state to show the confirm sign up form for MFA */
      setAuthState(AuthState.ConfirmSignUp)
    } catch (err) { console.log({ err }); }
  }

  /* Confirm sign up function for MFA */
  async function confirmSignUp() {
    try {
      console.log(formInputState)
      console.log("Confirming signup for " + formInputState.username)
      console.log(await Auth.confirmSignUp(formInputState.username, formInputState.verificationCode));
      /* Once the user successfully confirms their account, update form state to show the sign in form*/
      setAuthState(AuthState.SignIn)
    } catch (err) { console.log({ err }); }
  }

  /* Sign in function */
  async function signIn() {
    try {
      setUser(await Auth.signIn(formInputState.username, formInputState.password))
      /* Once the user successfully signs in, update the form state to show the signed in state */
      setAuthState(AuthState.SignedIn)
    } catch (err) { 
      if(err.code === "UserNotConfirmedException") setAuthState(AuthState.ConfirmSignUp)
      else console.log({ err }); }
  }

  /* Sign in function */
  async function signOut() {
    try {
      setUser(undefined)
      await Auth.signOut()
      /* Once the user successfully signs in, update the form state to show the signed in state */
      setAuthState(AuthState.SignedOut)
    } catch (err) { 
      console.log({ err }); }
  }


 /* If the form state is "signIn", show the sign in form */
 if (authState === AuthState.SignIn) {
   return (
     <div style={{ textAlign: 'center', display: 'grid', justifyContent: 'center'}}>
      <Paper elevation={2} >
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
    <Button onClick={signIn}>Sign In</Button>
    <Button onClick={() => setAuthState(AuthState.SignUp)}>Sign Up</Button>
      </Paper>
      </div>
   )
  }
  /* If the form state is "confirmSignUp", show the confirm sign up form */
  else if (authState === AuthState.ConfirmSignUp) {
  return (
    <div style={{ textAlign: 'center', display: 'grid', justifyContent: 'center'}}>
        <Paper elevation={2} >
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
      <Button onClick={confirmSignUp}>Confirm Sign Up</Button>
      </Paper>
      </div>
  )
  }
  /* If the form state is "signedIn", show the app */
  else if (authState === AuthState.SignedIn && user) {
  return (
    <div className="App">
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
        </IconButton>
        <Typography variant="h6" className="title">
          Hello, {user.username}
        </Typography>
        <Button onClick={signOut}>Log Out</Button>
      </Toolbar>
    </AppBar>
    <br/>
    <CurrentVisitors user={user}/>
    <LoggedVisits />
  </div>
  )
  }
  /* In the UI of the app, render forms based on form state */
    /* If the form state is "signUp", show the sign up form */
  else {
    return (
      <AmplifyAuthenticator>
      <div style={{ textAlign: 'center', display: 'grid', justifyContent: 'center'}}>
      <Paper elevation={2} >
      <h2>Sign Up</h2>
      <Input 
        key="nameFormField"
        placeholder="Full Name" 
        name="name" 
        inputProps={{ 'aria-label': 'username' }} 
        onChange={onChange}
      />
      <Input 
        key="userFormField"
        placeholder="Username/Scroll" 
        name="username" 
        inputProps={{ 'aria-label': 'username' }} 
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
          placeholder="Phone Number"
          name="phone_number"
          type="tel"
          inputProps={{ 'aria-label': 'phone number' }} 
          onChange={onChange}
      />
      <Input
          key="emailFormField"
          placeholder="Non-WPI email address"
          name="email"
          onChange={onChange}
      />
      <Button onClick={signUp}>Sign Up</Button>
      <Button onClick={() => setAuthState(AuthState.SignIn)}>Sign In</Button>
      </Paper>
      </div>
      </AmplifyAuthenticator>
  )
  }
}

export default AuthStateApp;