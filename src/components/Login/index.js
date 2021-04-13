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
    console.log('Log in Credentials', state?.credentials)
    axios.post(`http://localhost:8080/account/login`,
      state?.credentials
    ).then((response) => {
      console.log('Login response', response)
      if (response?.status !== 200) {
        setState({ ...state, message: 'Login error' });
      }
      if (response?.data === '') {
        setState({ ...state, message: 'Login failed' });
      }
      else if (response?.data.credentials.suspended !== 0) {
        setState({ ...state, message: 'Login suspended' });
      }
      else {
        const currentUser = {
          user_id: response?.data.user.id,
          credentials_id: response?.data.credentials.id,
          role: response?.data.credentials.role,
          username: response?.data.credentials.username
        };
        setCurrentUser(currentUser);
        LogIn(currentUser);
        history.push(`/home`)
      }
    });
  }

  return (
    <LoginView
      state={state}
      handleToggleHidePassword={handleToggleHidePassword}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}