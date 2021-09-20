import React from "react";
import {
  makeStyles,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  ArrowForwardIos as ProceedIcon,
  ExitToApp as LogInOutIcon,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import clsx from "clsx";
import StateDropdown from "./StateDropdown";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "calc(1.25rem + 1vmin)",
    marginBottom: "0.35em",
  },
  form: {
    background: "#292929",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    overflowY: "auto",
    marginInline: "10%",
    maxHeight: "77%",
  },
  textField: {
    width: "75%",
    maxWidth: 500,
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
  message: {
    color: "red",
  },
  button: {
    marginTop: 10,
    background: "black",
    color: "white",
  },
}));

export default function RegistrationView({
  registrationState,
  toggleHidePassword,
  handleChange,
  handleChangeNested,
  handleSelectState,
  handleKeyPress,
  handleSubmit,
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Typography className={styles.title}>Registration</Typography>
      <div className={styles.form}>
        <TextField
          id="username"
          label="Username*"
          value={registrationState.credentials.username}
          onChange={handleChange("credentials", "username")}
          className={styles.textField}
        />
        <FormControl className={styles.textField}>
          <InputLabel htmlFor="password">Password*</InputLabel>
          <Input
            id="password"
            value={registrationState.credentials.password}
            onChange={handleChange("credentials", "password")}
            type={registrationState?.hidePassword ? "password" : "text"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  className={styles.iconButton}
                  onClick={toggleHidePassword}
                >
                  {registrationState?.hidePassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <TextField
          id="email"
          label="Email*"
          value={registrationState.credentials.email}
          onChange={handleChange("credentials", "email")}
          className={styles.textField}
        />
        <TextField
          id="first_name"
          label="First Name"
          value={registrationState.credentials.user.first_name}
          onChange={handleChangeNested("credentials", "user", "first_name")}
          className={styles.textField}
        />
        <TextField
          id="last_name"
          label="Last Name"
          value={registrationState.credentials.user.last_name}
          onChange={handleChangeNested("credentials", "user", "last_name")}
          className={styles.textField}
        />
        <TextField
          id="occupation"
          label="Occupation"
          value={registrationState.credentials.user.occupation}
          onChange={handleChangeNested("credentials", "user", "occupation")}
          className={styles.textField}
        />
        <StateDropdown handleSelectState={handleSelectState} />
        <TextField
          id="age"
          label="Age"
          value={registrationState.credentials.user.age}
          onChange={handleChangeNested("credentials", "user", "age")}
          className={styles.textField}
        />
        <TextField
          id="bio"
          label="Bio"
          value={registrationState.credentials.user.bio}
          onChange={handleChangeNested("credentials", "user", "bio")}
          onKeyPress={handleKeyPress()}
          className={clsx(styles.textField, styles.multiline)}
          multiline
          rows={5}
        />
        <Typography className={styles.message}>
          {registrationState.message}
        </Typography>
        <div>
          <Link to="/login">
            <Tooltip title="Switch To Login">
              <IconButton className={styles.iconButton} onClick={null}>
                <LogInOutIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Tooltip title="Register">
            <IconButton className={styles.iconButton} onClick={handleSubmit}>
              <ProceedIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </React.Fragment>
  );
}
