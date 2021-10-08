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

export default function SuspendUserView({
  currentUser,
  profileState,
  userInfoState,
  toggleSuspendDialog,
  handleSubmitSuspend,
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      {currentUser?.role === 1 ? (
        <Dialog
          open={userInfoState.isSuspendDialogOpen}
          keepMounted
          onClose={toggleSuspendDialog}
          classes={{ paper: styles.dialogPaper }}
        >
          <DialogTitle className={styles.dialogTitle}>
            {profileState.user?.credentials.suspended === 0
              ? "Suspend Account"
              : "Unsuspend Account"}
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
                onClick={toggleSuspendDialog}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Yes">
              <IconButton
                className={styles.iconButton}
                onClick={handleSubmitSuspend}
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
