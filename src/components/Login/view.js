import React from 'react';
import { makeStyles, Typography, TextField, FormControl, InputLabel, Input, InputAdornment, IconButton, Button } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 'calc(1.25rem + 1vmin)',
    marginBottom: '0.35em'
  },
  form: {
    background: 'rgb(41, 41, 41)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    overflowY: 'auto',
    marginInline: '10%',
    marginBottom: '10%'
  },
  textField: {
    width: '75%',
    maxWidth: 500,
    minWidth: 100,
    marginBottom: '2%',
    overflow: 'hidden',
    color: 'white',
    '& .MuiInputBase-input': {
      color: 'white',
      fontSize: 'calc(.33rem + 2vmin)',
    },
    '& label': {
      color: 'white',
      fontSize: 'calc(1rem + .5vmin)',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white',
    },
    '& label.Mui-focused': {
      color: 'rgb(214, 214, 214)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'rgb(214, 214, 214)',
    },
  },
  multiline: {
    '& .MuiInputBase-input': {
      fontSize: 'calc(1rem + .5vmin)',
    }
  },
  iconButton: {
    color: 'white'
  },
  message: {
    color: 'red'
  },
  button: {
    marginTop: 10,
    background: 'black',
    color: 'white'
  }
}));

export default function Login({
  state,
  handleToggleHidePassword,
  handleChangeCredentials,
  handleSubmit
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Typography className={styles.title}>
        Log In to Your Account
      </Typography>
      <div className={styles.form}>
        <TextField
          id='username'
          label='Username'
          value={state?.credentials.username}
          onChange={handleChangeCredentials('username')}
          className={styles.textField}
        />
        <FormControl className={styles.textField}>
          <InputLabel htmlFor='password'>
            Password
          </InputLabel>
          <Input
            id='password'
            value={state?.credentials.password}
            onChange={handleChangeCredentials('password')}
            type={state?.hidePassword ? 'password' : 'text'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  className={styles.iconButton}
                  onClick={handleToggleHidePassword}
                >
                  {state?.hidePassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Typography className={styles.message}>
          {state.message}
        </Typography>

        <Button
          onClick={handleSubmit}
          className={styles.button}
          variant='contained'
        >
          Log In
        </Button>
      </div>
    </React.Fragment>
  );
}