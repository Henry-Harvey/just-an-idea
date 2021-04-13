import React, { useState } from 'react';
import axios from 'axios';
import history from '../../utils/history'
import RegistrationView from './view';

export default function Registration() {
  const [state, setState] = useState({
    credentials: {
      username: '',
      password: '',
      role: 0,
      suspended: 0
    },
    user: {
      id: -1,
      remainingUpvotes: 3,
      firstName: '',
      lastName: '',
      email: '',
      occupation: '',
      state: '',
      age: '',
      bio: ''
    },
    hidePassword: true,
    message: ''
  });

  const handleToggleHidePassword = () => {
    setState({ ...state, hidePassword: !state?.hidePassword });
  };

  const handleChange = (object, prop) => (event) => {
    setState({
      ...state,
      [object]: {
        ...state?.[object],
        [prop]: event.target.value
      }
    });
  };

  const handleSubmit = () => {
    console.log('Register Credentials + User', state?.credentials, state?.user)
    axios.post(`http://localhost:8080/account/register`,
      {
        credentials: { ...state?.credentials },
        user: { ...state?.user }
      }
    ).then((response) => {
      console.log('Registration response', response)
      if (response?.status !== 200) {
        setState({ ...state, message: 'Registration error' });
      }
      else {
        history.push(`/login`)
      }
    });
  }

  const handleNavigateToLogin = () => {
    history.push(`/login`)
  }

  return (
    <RegistrationView
      state={state}
      handleToggleHidePassword={handleToggleHidePassword}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleNavigateToLogin={handleNavigateToLogin}
    />
  )
}