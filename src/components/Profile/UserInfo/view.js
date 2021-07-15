import React from 'react';
import { makeStyles, TextField, Tooltip, IconButton } from '@material-ui/core'
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '75%',
    maxWidth: 600,
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
  iconButton: {
    color: 'white'
  }
}));

export default function UserInfoView({
  isUsersProfile,
  state,
  handleToggleEditDialog,
  handleToggleDeleteDialog
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      {!state.user?.firstName && !state.user?.lastName && !state.user?.occupation && !state.user?.state && !state.user?.age && !state.user?.bio ?
        <TextField
          id='no user data'
          value='No User Data'
          className={styles.textField}
          disabled
        />
        :
        null
      }
      {state.user?.firstName && state.user?.lastName ?
        <TextField
          id='name'
          label='Name'
          value={state.user?.firstName + ' ' + state.user?.lastName}
          className={styles.textField}
          disabled
        />
        :
        null
      }
      {state.user?.firstName && !state.user?.lastName ?
        <TextField
          id='name'
          label='First Name'
          value={state.user?.firstName}
          className={styles.textField}
          disabled
        />
        :
        null
      }
      {!state.user?.firstName && state.user?.lastName ?
        <TextField
          id='name'
          label='Last Name'
          value={state.user?.lastName}
          className={styles.textField}
          disabled
        />
        :
        null
      }
      {state.user?.occupation ?
        <TextField
          id='occupation'
          label='Occupation'
          value={state.user?.occupation}
          className={styles.textField}
          disabled
        />
        :
        null
      }
      {state.user?.state ?
        <TextField
          id='state'
          label='State'
          value={state.user?.state}
          className={styles.textField}
          disabled
        />
        :
        null
      }
      {state.user?.age ?
        <TextField
          id='age'
          label='Age'
          value={state.user?.age}
          className={styles.textField}
          disabled
        />
        :
        null
      }
      {state.user?.bio ?
        <TextField
          id='bio'
          label='Bio'
          value={state.user?.bio}
          className={clsx(styles.textField, styles.multiline)}
          multiline
          disabled
          maxrows={5}
        />
        :
        null
      }
      {isUsersProfile ?
        <div>
          <Tooltip title='Delete'>
            <IconButton
              className={styles.iconButton}
              onClick={handleToggleDeleteDialog}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Edit'>
            <IconButton
              className={styles.iconButton}
              onClick={handleToggleEditDialog}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </div>
        :
        null
      }
    </React.Fragment>
  );
}