import React, { useState } from 'react';
import { useHistory } from 'react-router'
import axios from 'axios';
import { LogIn } from '../../utils'

import LoginView from './view';

export default function Login({ setCurrentUser }) {
  const history = useHistory();
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

  const handleChangeCredentials = (prop) => (event) => {
    setState({ credentials: { ...state?.credentials, [prop]: event.target.value } });
  };

  const handleSubmit = () => {
    console.log('Log in Credentials', state?.credentials)
    axios.post(`http://localhost:8080/account/login`,
      {
        username: state?.credentials.username,
        password: state?.credentials.password,
      }).then((response) => {
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
          LogIn();

          setCurrentUser(
            {
              user_id: response?.data.user.id,
              credentials_id: response?.data.credentials.id,
              role: response?.data.credentials.role,
              username: response?.data.credentials.username
            }
          );
          history.push(`/home`)
        }
      });
  }

  return (
    <LoginView
      state={state}
      handleToggleHidePassword={handleToggleHidePassword}
      handleChangeCredentials={handleChangeCredentials}
      handleSubmit={handleSubmit}
    />
  )
}