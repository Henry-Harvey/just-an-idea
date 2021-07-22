import React from 'react';
import { makeStyles, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip, IconButton } from '@material-ui/core'
import { Check as CheckIcon, Close as CloseIcon } from '@material-ui/icons';
import clsx from 'clsx';
import StateDropdown from './StateDropdown'

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
  dialogTitle: {
    color: 'white'
  },
  dialogContent: {
    color: 'white'
  },
  dialogPaper: {
    backgroundColor: '#292929'
  },
  iconButton: {
    color: 'white'
  }
}));

export default function EditUserInfoView({
  isUsersProfile,
  state,
  handleChange,
  handleSelectState,
  handleToggleEditDialog,
  handleSubmitEdit
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      {isUsersProfile ?
        <Dialog
          open={state.isEditDialogOpen}
          keepMounted
          onClose={handleToggleEditDialog}
          classes={{ paper: styles.dialogPaper }}
        >
          <DialogTitle className={styles.dialogTitle}>Edit Profile</DialogTitle>
          <DialogContent className={styles.dialogContent}>
            <TextField
              id='editFirstName'
              label='First Name'
              value={state?.editUser.firstName}
              onChange={handleChange('editUser', 'firstName')}
              className={styles.textField}
            />
            <TextField
              id='editLastName'
              label='Last Name'
              value={state?.editUser.lastName}
              onChange={handleChange('editUser', 'lastName')}
              className={styles.textField}
            />
            <TextField
              id='editOccupation'
              label='Occupation'
              value={state?.editUser.occupation}
              onChange={handleChange('editUser', 'occupation')}
              className={styles.textField}
            />
            <StateDropdown
              handleSelectState={handleSelectState}
              value={state?.editUser.state}
            />
            <TextField
              id='editAge'
              label='Age'
              value={state?.editUser.age}
              onChange={handleChange('editUser', 'age')}
              className={styles.textField}
            />
            <TextField
              id='editBio'
              label='Bio'
              value={state?.editUser.bio}
              onChange={handleChange('editUser', 'bio')}
              className={clsx(styles.textField, styles.multiline)}
              multiline
              maxrows={5}
            />
            <Typography className={styles.message}>
              {state.message}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Tooltip title='Cancel'>
              <IconButton
                className={styles.iconButton}
                onClick={handleToggleEditDialog}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Submit'>
              <IconButton
                className={styles.iconButton}
                onClick={handleSubmitEdit}>
                <CheckIcon />
              </IconButton>
            </Tooltip>
          </DialogActions>
        </Dialog>
        :
        null
      }
    </React.Fragment>
  );
}