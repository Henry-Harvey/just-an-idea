import React from "react";
import { AppBar, makeStyles, IconButton, Tooltip } from "@material-ui/core";
import {
  Home as HomeIcon,
  Info as InfoIcon,
  AccountBox as AccountIcon,
  AddBox as PostIcon,
  ExitToApp as LogInOutIcon,
  Assignment as RegistrationIcon,
  ArrowDropDownCircle as UpvotesIcon,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "1rem",
  },
  appBar: {
    width: "auto",
    height: "96%",
    textAlign: "center",
    backgroundColor: "#700000",
    border: "2.5px solid black",
    position: "relative",
    overflow: "hidden",
    justifyContent: "space-around",
  },
  iconButton: {
    width: 33,
    padding: 8,
  },
  upsideDownIconButton: {
    width: 33,
    padding: 8,
    transform: "rotate(180deg)",
  },
  link: {
    textDecoration: "none",
    color: "white",
    smargin: 10,
  },
  logo: {
    width: 27.5,
  },
}));

export default function MinSidePanelView({ currentUser }) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <AppBar className={styles.appBar}>
        <Link to="/" className={styles.link}>
          {/* <Typography className={styles.title}>Just An Idea</Typography> */}
          <img
            className={styles.logo}
            src="/images/jai-logo-white.jpg"
            alt="jai"
          />
        </Link>
        <Link to="/home">
          <Tooltip title="Home">
            <IconButton className={styles.iconButton} onClick={null}>
              <HomeIcon />
            </IconButton>
          </Tooltip>
        </Link>
        <Link to="/about">
          <Tooltip title="About">
            <IconButton className={styles.iconButton} onClick={null}>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Link>
        {currentUser ? (
          <Link to="/profile">
            <Tooltip
              title={
                currentUser.role === 1 ? "My Profile [Admin]" : "My Profile"
              }
            >
              <IconButton className={styles.iconButton} onClick={null}>
                <AccountIcon />
              </IconButton>
            </Tooltip>
          </Link>
        ) : null}
        {currentUser ? (
          <Link to="/upvotes">
            <Tooltip title={"My Upvotes"}>
              <IconButton
                className={styles.upsideDownIconButton}
                onClick={null}
              >
                <UpvotesIcon />
              </IconButton>
            </Tooltip>
          </Link>
        ) : null}
        {currentUser ? (
          <Link to="/post">
            <Tooltip title="Post">
              <IconButton className={styles.iconButton} onClick={null}>
                <PostIcon />
              </IconButton>
            </Tooltip>
          </Link>
        ) : null}
        {currentUser ? null : (
          <Link to="/registration">
            <Tooltip title="Registration">
              <IconButton className={styles.iconButton} onClick={null}>
                <RegistrationIcon />
              </IconButton>
            </Tooltip>
          </Link>
        )}
        {currentUser ? (
          <Link to="/logout">
            <Tooltip title="Log out">
              <IconButton className={styles.iconButton} onClick={null}>
                <LogInOutIcon />
              </IconButton>
            </Tooltip>
          </Link>
        ) : (
          <Link to="/login">
            <Tooltip title="Login">
              <IconButton className={styles.iconButton} onClick={null}>
                <LogInOutIcon />
              </IconButton>
            </Tooltip>
          </Link>
        )}
      </AppBar>
    </React.Fragment>
  );
}
