import React from "react";
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { Check as CheckIcon, Close as CloseIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    color: "white",
  },
  dialogContent: {
    color: "white",
  },
  dialogPaper: {
    backgroundColor: "#292929",
  },
  iconButton: {
    color: "white",
  },
}));

export default function DeleteIdeaView({
  ideaState,
  toggleDeleteDialog,
  handleSubmitDelete,
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Dialog
        open={ideaState.isDeleteDialogOpen}
        keepMounted
        onClose={toggleDeleteDialog}
        classes={{ paper: styles.dialogPaper }}
      >
        <DialogTitle className={styles.dialogTitle}>Delete Idea</DialogTitle>
        <DialogContent>
          <DialogContentText className={styles.dialogContent}>
            Are you sure you want to delete '{ideaState?.idea?.title}'?
          </DialogContentText>
        </DialogContent>
        <DialogActions className={styles.buttons}>
          <Tooltip title="No">
            <IconButton
              className={styles.iconButton}
              onClick={toggleDeleteDialog}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Yes">
            <IconButton
              className={styles.iconButton}
              onClick={handleSubmitDelete}
            >
              <CheckIcon />
            </IconButton>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
