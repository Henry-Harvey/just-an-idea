import React from 'react';
import { makeStyles, Typography, TextField, FormControl, InputLabel, Input, InputAdornment, IconButton, Tooltip } from '@material-ui/core';
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, ArrowForwardIos as ProceedIcon, Assignment as RegistrationIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 'calc(1.25rem + 1vmin)',
    marginBottom: '0.35em'
  },
  form: {
    background: '#292929',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    overflowY: 'auto',
    marginInline: '10%',
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
  }
}));

export default function LoginView({
  state,
  handleToggleHidePassword,
  handleChange,
  handleKeyPress,
  handleSubmit
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Typography className={styles.title}>
        Login
      </Typography>
      <div className={styles.form}>
        <TextField
          id='username'
          label='Username'
          value={state?.credentials.username}
          onChange={handleChange('credentials', 'username')}
          className={styles.textField}
        />
        <FormControl className={styles.textField}>
          <InputLabel htmlFor='password'>
            Password
          </InputLabel>
          <Input
            id='password'
            value={state?.credentials.password}
            onChange={handleChange('credentials', 'password')}
            onKeyPress={handleKeyPress()}
            type={state?.hidePassword ? 'password' : 'text'}
            endAdornment={
              <InputAdornment position='end'>
                <Tooltip title='Show/Hide'>
                  <IconButton
                    className={styles.iconButton}
                    onClick={handleToggleHidePassword}
                  >
                    {state?.hidePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            }
          />
        </FormControl>
        <Typography className={styles.message}>
          {state.message}
        </Typography>
        <div>
          <Link to='/registration'>
            <Tooltip title='Switch To Registration'>
              <IconButton
                className={styles.iconButton}
                onClick={null}>
                <RegistrationIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Tooltip title='Log in'>
            <IconButton
              className={styles.iconButton}
              onClick={handleSubmit}>
              <ProceedIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </React.Fragment>
  );
}