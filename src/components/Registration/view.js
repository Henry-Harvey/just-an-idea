import React from 'react';
import { makeStyles, Typography, TextField, FormControl, InputLabel, Input, InputAdornment, IconButton, Tooltip } from '@material-ui/core';
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, ArrowForward as ArrowForwardIcon, ImportExport as ImportExportIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import StateDropdown from './StateDropdown'

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
    maxHeight: '77%',
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
      color: '#D6D6D6',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#D6D6D6',
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
  },
}));

export default function RegistrationView({
  state,
  handleToggleHidePassword,
  handleChange,
  handleSelectState,
  handleSubmit
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Typography className={styles.title}>
        Registration
      </Typography>
      <div className={styles.form}>
        <TextField
          id='username'
          label='Username*'
          value={state?.credentials.username}
          onChange={handleChange('credentials', 'username')}
          className={styles.textField}
        />
        <FormControl className={styles.textField}>
          <InputLabel htmlFor='password'>
            Password*
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
        <TextField
          id='email'
          label='Email'
          value={state?.user.email}
          onChange={handleChange('credentials', 'email')}
          className={styles.textField}
        />
        <TextField
          id='firstName'
          label='First Name*'
          value={state?.user.firstName}
          onChange={handleChange('user', 'firstName')}
          className={styles.textField}
        />
        <TextField
          id='lastName'
          label='Last Name*'
          value={state?.user.lastName}
          onChange={handleChange('user', 'lastName')}
          className={styles.textField}
        />
        <TextField
          id='occupation'
          label='Occupation'
          value={state?.user.occupation}
          onChange={handleChange('user', 'occupation')}
          className={styles.textField}
        />
        <StateDropdown
          handleSelectState={handleSelectState}
        />
        <TextField
          id='age'
          label='Age'
          value={state?.user.age}
          onChange={handleChange('user', 'age')}
          className={styles.textField}
        />
        <TextField
          id='bio'
          label='Bio'
          value={state?.user.bio}
          onChange={handleChange('user', 'bio')}
          className={clsx(styles.textField, styles.multiline)}
          multiline
          rows={5}
        />
        <Typography className={styles.message}>
          {state.message}
        </Typography>
        <div>
          <Link to='/login'>
            <Tooltip title='Switch To Login'>
              <IconButton
                className={styles.iconButton}
                onClick={null}>
                <ImportExportIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Tooltip title='Register'>
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