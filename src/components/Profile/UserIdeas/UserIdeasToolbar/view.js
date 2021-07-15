import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Visibility as VisibilityIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { Done as DoneIcon, Close as CloseIcon, ListAlt as ListAltIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    marginRight: 24
  },
  dialogTitle: {
    color: 'white'
  },
  dialogContent: {
    color: 'white'
  },
  dialogPaper: {
    backgroundColor: '#292929'
  }
}));

export default function UserIdeasToolbarView({
  isUsersProfile,
  selectedIdea,
  state,
  handleToggleDeleteDialog,
  handleSubmitDelete
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <div className={styles.toolbar}>
        <Link
          to={'/idea/' + selectedIdea.id}
          className={styles.link}
        >
          <Tooltip title="View Idea">
            <IconButton>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </Link>
        <Link
          to={'/topic/' + selectedIdea.topics_id}
          className={styles.link}
        >
          <Tooltip title="View Topic">
            <IconButton>
              <ListAltIcon />
            </IconButton>
          </Tooltip>
        </Link>
        {isUsersProfile ?
          <Tooltip title="Delete">
            <IconButton
              onClick={handleToggleDeleteDialog}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          :
          null
        }

      </div>
      <Dialog
        open={state.isDeleteDialogOpen}
        keepMounted
        onClose={handleToggleDeleteDialog}
        classes={{ paper: styles.dialogPaper }}
      >
        <DialogTitle className={styles.dialogTitle}>Delete Idea</DialogTitle>
        <DialogContent>
          <DialogContentText className={styles.dialogContent}>
            Are you sure you want to delete '{selectedIdea.title}'?
          </DialogContentText>
        </DialogContent>
        <DialogActions className={styles.buttons}>
          <Tooltip title='No'>
            <IconButton
              className={styles.iconButton}
              onClick={handleToggleDeleteDialog}>
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