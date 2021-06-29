import React from 'react';
import { makeStyles, Typography, TextField, IconButton, Tooltip } from '@material-ui/core';
import { ArrowForward as ArrowForwardIcon, List as ListIcon } from '@material-ui/icons';
import clsx from 'clsx';

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
    //borderRadius: 10,
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

export default function PostView({
  state,
  handleChange,
  handleSubmit,
  handleNavigateToProfile
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Typography className={styles.title}>
        Post a New Idea
      </Typography>
      <div className={styles.form}>
        <TextField
          id='topic'
          label='Topic'
          value={state?.topic.title}
          onChange={handleChange('topic', 'title')}
          className={styles.textField}
        />
        <TextField
          id='title'
          label='Title'
          value={state?.idea.title}
          onChange={handleChange('idea', 'title')}
          className={styles.textField}
        />
        <TextField
          id='description'
          label='Description'
          value={state?.idea.description}
          onChange={handleChange('idea', 'description')}
          className={clsx(styles.textField, styles.multiline)}
          multiline
          rows={20}
        />
        <Typography className={styles.message}>
          {state.message}
        </Typography>
        <div>
          <Tooltip title='See My Ideas'>
            <IconButton
              className={styles.iconButton}
              onClick={handleNavigateToProfile}>
              <ListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Create'>
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