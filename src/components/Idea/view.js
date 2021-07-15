import React from 'react';
import { makeStyles, Typography, TextField } from '@material-ui/core'
import clsx from 'clsx';
import { IconButton, Tooltip } from '@material-ui/core';
import { ArrowUpward as ArrowUpwardIcon } from '@material-ui/icons';
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
  state,
  handleUpvoteIdea
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Typography className={styles.title}>
        {state.ideaInfo?.idea.title}
      </Typography>
      <div className={styles.upvote}>
        <Tooltip title='Upvotes'>
          <Typography className={styles.title}>
            {state.ideaInfo?.upvotes}
          </Typography>
        </Tooltip>
        {currentUser.user_id === state.ideaInfo?.idea.users_id ?
          null
          :
          <Tooltip title={<div>Upvote Idea</div>}>
            <IconButton
              className={styles.iconButton}
              onClick={handleUpvoteIdea}>
              <ArrowUpwardIcon />
            </IconButton>
          </Tooltip>
        }
      </div>
      <div className={styles.form}>
        <TextField
          id='description'
          label='Description'
          value={state.ideaInfo?.idea.description}
          className={clsx(styles.textField, styles.multiline)}
          multiline
          disabled
          rowsMax={15}
        />
        <div className={styles.linkSize}>
          <Link
            to={'/topic/' + state.ideaInfo?.topic.id}
            className={styles.link}
          >
            <TextField
              id='topic'
              label='Topic'
              value={state.ideaInfo?.topic.title}
              className={styles.textField}
              disabled
            />
          </Link>
        </div>
        <div className={styles.linkSize}>
          <Link
            to={'/profile/' + state.ideaInfo?.idea.users_id}
            className={styles.link}
          >
            <TextField
              id='author'
              label='Author'
              value={state.ideaInfo?.author}
              className={styles.textField}
              disabled
            />
          </Link>
        </div>
        <TextField
          id='timestamp'
          label='Posted on'
          value={state.ideaInfo?.idea.timestamp || ''}
          className={styles.textField}
          disabled
        />
      </div>
    </React.Fragment>
  );
}