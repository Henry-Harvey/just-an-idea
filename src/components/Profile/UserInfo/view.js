import React from 'react';
import { makeStyles, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Tooltip, IconButton } from '@material-ui/core'
import { Edit as EditIcon, Delete as DeleteIcon, Done as DoneIcon, Close as CloseIcon } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
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
  },
  dialogTitle: {
    color: 'white',
    textAlign: 'center'
  },
  dialogContent: {
    color: 'white'
  },
  dialogPaper: {
    backgroundColor: '#292929'
  },
  message: {
    color: 'red'
  },
  iconButton: {
    color: 'white'
  }
}));

export default function UserInfoView({
  state,
  handleChange,
  handleOpenEdit,
  handleCloseEdit,
  handleSubmitEdit,
  handleOpenDelete,
  handleCloseDelete,
  handleSubmitDelete
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <TextField
        id='name'
        label='Name'
        value={state.user?.firstName + ' ' + state.user?.lastName}
        className={styles.textField}
        disabled
      />
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
      <div>
        <Tooltip title='Delete'>
          <IconButton
            className={styles.iconButton}
            onClick={handleOpenDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Edit'>
          <IconButton
            className={styles.iconButton}
            onClick={handleOpenEdit}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </div>
      <Dialog
        open={state.openEdit}
        keepMounted
        onClose={handleCloseEdit}
        classes={{ paper: styles.dialogPaper }}
      >
        <DialogTitle className={styles.dialogTitle}>Edit Profile</DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <TextField
            id='editFirstName'
            label='First Name*'
            value={state?.editUser.firstName}
            onChange={handleChange('editUser', 'firstName')}
            className={styles.textField}
          />
          <TextField
            id='editLastName'
            label='Last Name*'
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
          <TextField
            id='editState'
            label='State'
            value={state?.editUser.state}
            onChange={handleChange('editUser', 'state')}
            className={styles.textField}
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
              onClick={handleCloseEdit}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Submit'>
            <IconButton
              className={styles.iconButton}
              onClick={handleSubmitEdit}>
              <DoneIcon />
            </IconButton>
          </Tooltip>
        </DialogActions>
      </Dialog>
      <Dialog
        open={state.openDelete}
        keepMounted
        onClose={handleCloseDelete}
        classes={{ paper: styles.dialogPaper }}
      >
        <DialogTitle className={styles.dialogTitle}>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText className={styles.dialogContent}>
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions className={styles.buttons}>
          <Tooltip title='No'>
            <IconButton
              className={styles.iconButton}
              onClick={handleCloseDelete}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Yes'>
            <IconButton
              className={styles.iconButton}
              onClick={handleSubmitDelete}>
              <DoneIcon />
            </IconButton>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}