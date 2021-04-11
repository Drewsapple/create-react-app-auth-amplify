import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default withAuthenticator(App, true, [], null, null, {
  defaultCountryCode: 1,
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Full Name",
      key: "name",
      required: true,
      placeholder: "Carl Ziegler",
      type: "name",
      displayOrder: 1,
    },
    {
      label: 'Username',
      key: 'preferred_username',
      required: true,
      placeholder: 'Use your scroll if you can',
      displayOrder: 2,
    },
    {
      label: 'Phone Number',
      key: 'phone_number',
      placeholder: 'Phone Number',
      required: true,
      displayOrder: 3,
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      placeholder: 'Non-WPI Email',
      type: 'email',
      displayOrder: 4,
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      placeholder: 'Password',
      type: 'password',
      displayOrder: 5,
    },
  ],
});

// export default withAuthenticator(App, false);
