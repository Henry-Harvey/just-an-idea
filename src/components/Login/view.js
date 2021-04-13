import React from 'react';
import { makeStyles, Typography, TextField, FormControl, InputLabel, Input, InputAdornment, IconButton, Tooltip } from '@material-ui/core';
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, ArrowForward as ArrowForwardIcon, ImportExport as ImportExportIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';

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
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
  },
  button: {
    marginTop: 10,
    background: 'black',
    color: 'white'
  }
}));

export default function LoginView({
  state,
  handleToggleHidePassword,
  handleChange,
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
            type={state?.hidePassword ? 'password' : 'text'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  className={styles.iconButton}
                  onClick={handleToggleHidePassword}
                >
                  {state?.hidePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Typography className={styles.message}>
          {state.message}
        </Typography>
        <div className={styles.buttons}>
          <Link to='/registration'>
            <Tooltip title='To Registration'>
              <IconButton
                className={styles.iconButton}
                onClick={null}>
                <ImportExportIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Tooltip title='Log in'>
            <IconButton
              className={styles.iconButton}
              onClick={handleSubmit}>
              <ArrowForwardIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </React.Fragment>
  );
}