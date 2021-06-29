import React from 'react';
import { makeStyles, Typography, TextField } from '@material-ui/core'
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'left'
  },
  title: {
    fontSize: 'calc(1.25rem + 1vmin)',
    marginBottom: '0.35em'
  },
  info: {
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
    '& .MuiFormLabel-root.Mui-disabled': {
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
  button: {
    marginTop: 10,
    background: 'black',
    color: 'white'
  }
}));

export default function IdeaView({
  state
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <div className={styles.container}>
        <Typography className={styles.title}>
          Idea
        </Typography>
        <div className={styles.info}>
          <TextField
            id='topic'
            label='Topic'
            value={state.topic?.title}
            className={styles.textField}
            disabled
          />
          <TextField
            id='title'
            label='Title'
            value={state.idea?.title}
            className={styles.textField}
            disabled
          />
          <TextField
            id='description'
            label='Description'
            value={state.idea?.description}
            className={clsx(styles.textField, styles.multiline)}
            multiline
            disabled
            rowsMax={15}
          />
          <TextField
            id='author'
            label='Author'
            value={state.user?.firstName + ' ' + state.user?.lastName}
            className={styles.textField}
            disabled
          />
        </div>
      </div>
    </React.Fragment>
  );
}