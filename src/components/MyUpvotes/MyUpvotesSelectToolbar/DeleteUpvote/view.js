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

export default function DeleteUpvoteView({
  selectedUpvote,
  myUpvotesSelectToolbarState,
  toggleDeleteDialog,
  handleSubmitDelete,
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Dialog
        open={myUpvotesSelectToolbarState.isDeleteDialogOpen}
        keepMounted
        onClose={toggleDeleteDialog}
        classes={{ paper: styles.dialogPaper }}
      >
        <DialogTitle className={styles.dialogTitle}>Delete Upvote</DialogTitle>
        <DialogContent>
          <DialogContentText className={styles.dialogContent}>
            For the idea titled, "{selectedUpvote?.idea.title}"?
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
