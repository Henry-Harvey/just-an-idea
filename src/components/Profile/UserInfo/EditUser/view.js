import React from "react";
import {
  makeStyles,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { Check as CheckIcon, Close as CloseIcon } from "@material-ui/icons";
import clsx from "clsx";
import StateDropdown from "./StateDropdown";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "75%",
    maxWidth: 600,
    minWidth: 100,
    marginBottom: "2%",
    overflow: "hidden",
    color: "white",
    "& .MuiInputBase-input": {
      color: "white",
      fontSize: "calc(.33rem + 2vmin)",
    },
    "& label": {
      color: "white",
      fontSize: "calc(1rem + .5vmin)",
    },
    "& .MuiFormLabel-root.Mui-disabled": {
      color: "white",
      fontSize: "calc(1rem + .5vmin)",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "& label.Mui-focused": {
      color: "#D6D6D6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#D6D6D6",
    },
  },
  multiline: {
    "& .MuiInputBase-input": {
      fontSize: "calc(1rem + .5vmin)",
    },
  },
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
  message: {
    color: "red",
  },
}));

export default function EditUserView({
  userInfoState,
  isUsersProfile,
  toggleEditDialog,
  handleChange,
  handleSelectState,
  handleSubmitEdit,
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      {isUsersProfile ? (
        <Dialog
          open={userInfoState.isEditDialogOpen}
          keepMounted
          onClose={toggleEditDialog}
          classes={{ paper: styles.dialogPaper }}
        >
          <DialogTitle className={styles.dialogTitle}>Edit Profile</DialogTitle>
          <DialogContent className={styles.dialogContent}>
            <TextField
              id="editDisplayName"
              label="Display Name*"
              value={userInfoState?.editUser.display_name || ""}
              onChange={handleChange("editUser", "display_name")}
              className={styles.textField}
            />
            <TextField
              id="editFirstName"
              label="First Name"
              value={userInfoState?.editUser.first_name || ""}
              onChange={handleChange("editUser", "first_name")}
              className={styles.textField}
            />
            <TextField
              id="editLastName"
              label="Last Name"
              value={userInfoState?.editUser.last_name || ""}
              onChange={handleChange("editUser", "last_name")}
              className={styles.textField}
            />
            <TextField
              id="editOccupation"
              label="Occupation"
              value={userInfoState?.editUser.occupation || ""}
              onChange={handleChange("editUser", "occupation")}
              className={styles.textField}
            />
            <StateDropdown
              handleSelectState={handleSelectState}
              value={userInfoState?.editUser.state || ""}
            />
            <TextField
              id="editAge"
              label="Age"
              value={userInfoState?.editUser.age || ""}
              onChange={handleChange("editUser", "age")}
              className={styles.textField}
            />
            <TextField
              id="editBio"
              label="Bio"
              value={userInfoState?.editUser.bio || ""}
              onChange={handleChange("editUser", "bio")}
              className={clsx(styles.textField, styles.multiline)}
              multiline
              maxrows={5}
            />
            <Typography className={styles.message}>
              {userInfoState.message}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Tooltip title="Cancel">
              <IconButton
                className={styles.iconButton}
                onClick={toggleEditDialog}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Submit">
              <IconButton
                className={styles.iconButton}
                onClick={handleSubmitEdit}
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
