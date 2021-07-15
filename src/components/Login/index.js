import React, { useState } from 'react';
import axios from 'axios';
import history from '../../utils/history'
import { LogIn } from '../../utils'
import LoginView from './view';

export default function Login({ setCurrentUser }) {
  const [state, setState] = useState({
    credentials: {
      username: '',
      password: ''
    },
    hidePassword: true,
    message: ''
  });

  const handleToggleHidePassword = () => {
    setState(state => ({
      ...state,
      hidePassword: !state?.hidePassword
    }));
  };

  const handleChange = (object, prop) => (event) => {
    setState(state => ({
      ...state,
      [object]: {
        ...state?.[object],
        [prop]: event.target.value
      }
    }));
  };

  const handleKeyPress = () => (event) => {
    if (event?.charCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    console.log('Log in with Credentials', state?.credentials)
    axios.post(`http://localhost:8080/account/login`,
      state?.credentials
    ).then((credentialsResponse) => {
      console.log('Log in response', credentialsResponse)
      if (credentialsResponse?.data === '') {
        console.log('Credentials not found');
        setState(state => ({
          ...state,
          message: 'Credentials not found'
        }));
        return;
      }
      if (credentialsResponse?.data.credentials.suspended !== 0) {
        console.log('Credentials have been suspended');
        setState(state => ({
          ...state,
          message: 'Credentials have been suspended'
        }));
        return;
      }
      const currentUser = {
        user_id: credentialsResponse?.data.user.id,
        credentials_id: credentialsResponse?.data.credentials.id,
        role: credentialsResponse?.data.credentials.role,
        username: credentialsResponse?.data.credentials.username
      };
      setCurrentUser(currentUser);
      LogIn(currentUser);
      history.push(`/home`)
    }).catch(error => {
      console.log('Log in error', error);
      setState(state => ({
        ...state,
        message: 'Log in error'
      }));
    });
  }

  return (
    <LoginView
      state={state}
      handleToggleHidePassword={handleToggleHidePassword}
      handleChange={handleChange}
      handleKeyPress={handleKeyPress}
      handleSubmit={handleSubmit}
    />
  )
}