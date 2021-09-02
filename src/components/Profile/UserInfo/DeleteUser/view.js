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

export default function DeleteUserView({
  userInfoState,
  isUsersProfile,
  handleToggleDeleteDialog,
  handleSubmitDelete,
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      {isUsersProfile ? (
        <Dialog
          open={userInfoState.isDeleteDialogOpen}
          keepMounted
          onClose={handleToggleDeleteDialog}
          classes={{ paper: styles.dialogPaper }}
        >
          <DialogTitle className={styles.dialogTitle}>
            Delete Account
          </DialogTitle>
          <DialogContent>
            <DialogContentText className={styles.dialogContent}>
              Are you sure?
            </DialogContentText>
          </DialogContent>
          <DialogActions className={styles.buttons}>
            <Tooltip title="No">
              <IconButton
                className={styles.iconButton}
                onClick={handleToggleDeleteDialog}
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
      ) : null}
    </React.Fragment>
  );
}
