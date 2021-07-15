import React, { useState } from 'react';
import axios from 'axios';
import history from '../../utils/history'
import RegistrationView from './view';

export default function Registration() {
  const [state, setState] = useState({
    credentials: {
      username: '',
      password: '',
      email: '',
      role: 0,
      suspended: 0
    },
    user: {
      id: -1,
      firstName: '',
      lastName: '',
      occupation: '',
      state: '',
      age: '',
      bio: ''
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

  const handleSelectState = (stateAbbreviation) => {
    setState(state => ({
      ...state,
      user: {
        ...state?.user,
        state: stateAbbreviation
      }
    }));
  }

  const handleKeyPress = () => (event) => {
    if (event?.charCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    console.log('Register with Credentials & User', state?.credentials, state?.user)
    axios.post(`http://localhost:8080/account/register`,
      {
        credentials: { ...state?.credentials },
        user: { ...state?.user }
      }
    ).then((accountResponse) => {
      console.log('Register response', accountResponse)
      history.push(`/login`)
    }).catch(error => {
      console.log('Register error', error);
    });
  }

  return (
    <RegistrationView
      state={state}
      handleToggleHidePassword={handleToggleHidePassword}
      handleChange={handleChange}
      handleKeyPress={handleKeyPress}
      handleSelectState={handleSelectState}
      handleSubmit={handleSubmit}
    />
  )
}