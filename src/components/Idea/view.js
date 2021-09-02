import React from 'react';
import { makeStyles, Typography, TextField } from '@material-ui/core'
import clsx from 'clsx';
import { Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Upvote from './Upvote';

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
  linkSize: {
    width: '100%',
    color: 'white'
  },
  link: {
    textDecorationColor: 'white',
    cursor: 'pointer'
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
      cursor: 'inherit'
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
    '& .MuiInputBase-root.Mui-disabled': {
      cursor: 'inherit'
    },
  },
  multiline: {
    '& .MuiInputBase-input': {
      fontSize: 'calc(1rem + .5vmin)',
    }
  },
  upvote: {
    display: 'flex',
    marginLeft: '9%',
    height: 40,
    '& .MuiSvgIcon-root': {
      fontSize: '2rem',
    }
  }
}));

export default function IdeaView({
  currentUser,
  ideaState,
  updateUpvotes
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Typography className={styles.title}>
        {ideaState.idea.title}
      </Typography>
      <div className={styles.upvote}>
        <Tooltip title='Upvotes'>
          <Typography className={styles.title}>
            {ideaState.idea.upvotes.length}
          </Typography>
        </Tooltip>
        {currentUser?.user_id === ideaState.idea.user.id
          ?
          null
          :
          <Upvote
            currentUser={currentUser}
            ideaState={ideaState}
            updateUpvotes={updateUpvotes}
          />
        }
      </div>
      <div className={styles.form}>
        <TextField
          id='description'
          label='Description'
          value={ideaState.idea.description}
          className={clsx(styles.textField, styles.multiline)}
          multiline
          disabled
          maxRows={15}
        />
        <div className={styles.linkSize}>
          <Link
            to={'/topic/' + ideaState.idea.topic.id}
            className={styles.link}
          >
            <TextField
              id='topic'
              label='Topic'
              value={ideaState.idea.topic.title}
              className={styles.textField}
              disabled
            />
          </Link>
        </div>
        <div className={styles.linkSize}>
          <Link
            to={'/profile/' + ideaState.idea.user.id}
            className={styles.link}
          >
            <TextField
              id='author'
              label='Author'
              value={ideaState.idea.user.display_name}
              className={styles.textField}
              disabled
            />
          </Link>
        </div>
        <TextField
          id='timestamp'
          label='Posted on'
          value={ideaState.idea.timestamp}
          className={styles.textField}
          disabled
        />
      </div>
    </React.Fragment>
  );
}