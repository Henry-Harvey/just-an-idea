import React from "react";
import { makeStyles, TextField, Tooltip, IconButton } from "@material-ui/core";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  PauseCircleOutline as SuspendIcon,
  PauseCircleFilled as SuspendedIcon,
} from "@material-ui/icons";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "90%",
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
  iconButton: {
    color: "white",
  },
}));

export default function UserInfoView({
  currentUser,
  profileState,
  isUsersProfile,
  toggleEditDialog,
  toggleDeleteDialog,
  toggleSuspendDialog,
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      {!profileState.user ? (
        <TextField
          id="no user data"
          value="No User Data"
          className={styles.textField}
          disabled
        />
      ) : null}
      {!isUsersProfile &&
      !profileState.user?.first_name &&
      !profileState.user?.last_name &&
      !profileState.user?.occupation &&
      !profileState.user?.state &&
      !profileState.user?.age &&
      !profileState.user?.bio ? (
        <TextField
          id="no user data"
          value="No User Data"
          className={styles.textField}
          disabled
        />
      ) : null}
      {profileState.user?.display_name ? (
        isUsersProfile ? (
          <TextField
            id="display_name"
            label="Display Name"
            value={profileState.user?.display_name}
            className={styles.textField}
            disabled
          />
        ) : null
      ) : null}
      {profileState.user?.first_name && profileState.user?.last_name ? (
        <TextField
          id="name"
          label="Name"
          value={
            profileState.user?.first_name + " " + profileState.user?.last_name
          }
          className={styles.textField}
          disabled
        />
      ) : null}
      {profileState.user?.first_name && !profileState.user?.last_name ? (
        <TextField
          id="name"
          label="First Name"
          value={profileState.user?.first_name}
          className={styles.textField}
          disabled
        />
      ) : null}
      {!profileState.user?.first_name && profileState.user?.last_name ? (
        <TextField
          id="name"
          label="Last Name"
          value={profileState.user?.last_name}
          className={styles.textField}
          disabled
        />
      ) : null}
      {profileState.user?.occupation ? (
        <TextField
          id="occupation"
          label="Occupation"
          value={profileState.user?.occupation}
          className={styles.textField}
          disabled
        />
      ) : null}
      {profileState.user?.state ? (
        <TextField
          id="state"
          label="State"
          value={profileState.user?.state}
          className={styles.textField}
          disabled
        />
      ) : null}
      {profileState.user?.age ? (
        <TextField
          id="age"
          label="Age"
          value={profileState.user?.age}
          className={styles.textField}
          disabled
        />
      ) : null}
      {profileState.user?.bio ? (
        <TextField
          id="bio"
          label="Bio"
          value={profileState.user?.bio}
          className={clsx(styles.textField, styles.multiline)}
          multiline
          disabled
          maxrows={5}
        />
      ) : null}
      {isUsersProfile ? (
        <div>
          <Tooltip title="Delete">
            <IconButton
              className={styles.iconButton}
              onClick={toggleDeleteDialog}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              className={styles.iconButton}
              onClick={toggleEditDialog}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </div>
      ) : null}
      {!isUsersProfile &&
      currentUser?.role === 1 &&
      profileState.user?.credentials.suspended === 0 ? (
        <div>
          <Tooltip title="Admin Suspend">
            <IconButton
              className={styles.iconButton}
              onClick={toggleSuspendDialog}
            >
              <SuspendIcon />
            </IconButton>
          </Tooltip>
        </div>
      ) : null}
      {!isUsersProfile &&
      currentUser?.role === 1 &&
      profileState.user?.credentials.suspended === 1 ? (
        <div>
          <Tooltip title="Admin Unsuspend">
            <IconButton
              className={styles.iconButton}
              onClick={toggleSuspendDialog}
            >
              <SuspendedIcon />
            </IconButton>
          </Tooltip>
        </div>
      ) : null}
    </React.Fragment>
  );
}
