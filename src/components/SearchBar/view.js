import React from "react";
import {
  AppBar,
  Toolbar,
  makeStyles,
  alpha,
  IconButton,
  InputBase,
} from "@material-ui/core";
import { Search as SearchIcon, Menu as MenuIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: "auto",
    margin: 10,
    backgroundColor: "#292929",
    position: "relative",
    overflow: "hidden",
    color: "white",
  },
  title: {
    height: "auto",
    overflow: "hidden",
  },
  toolbar: {
    display: "flex -moz-flex -ms-flexbox -webkit-flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    minWidth: 20,
  },
  iconButton: {
    color: "white",
    width: 30,
  },
  search: {
    position: "relative",
    textAlign: "left",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "100%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
}));

export default function SearchBarView({
  toggleSidePanel,
  userInput,
  onChange,
  onSubmit,
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <AppBar className={styles.appBar}>
        <Toolbar>
          <IconButton
            className={styles.iconButton}
            edge="start"
            onClick={toggleSidePanel}
          >
            <MenuIcon />
          </IconButton>
          <div className={styles.search}>
            <div className={styles.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={onSubmit}>
              <InputBase
                placeholder=""
                value={userInput}
                classes={{
                  root: styles.inputRoot,
                  input: styles.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={(event) => onChange(event)}
              />
            </form>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
