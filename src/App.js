import React, { useState, useRef, useEffect, useCallback } from "react";
import { publicAxios } from "./utils";
import { makeStyles } from "@material-ui/core";
import ResizePanel from "react-resize-panel";
// eslint-disable-next-line no-unused-vars
import style from "./App.css";
import { Router, Switch } from "react-router-dom";
import history from "./utils/history";
import {
  IsLoggedIn,
  GetCurrentUser,
  LogOut,
  SaveSidePanel,
  GetSidePanel,
} from "./utils";

import SidePanel from "./components/SidePanel";
import MinSidePanel from "./components/MinSidePanel";
import SearchBar from "./components/SearchBar";
import Home from "./components/Home";
import About from "./components/About";
import Profile from "./components/Profile";
import MyUpvotes from "./components/MyUpvotes";
import MyPins from "./components/MyPins";
import Post from "./components/Post";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Logout from "./components/Logout";
import SearchResults from "./components/SearchResults";
import Topic from "./components/Topic";
import Welcome from "./components/Welcome";
import PublicRoute from "./utils/Routes/PublicRoute";
import PrivateRoute from "./utils/Routes/PrivateRoute";
import Idea from "./components/Idea";

const useStyles = makeStyles({
  body: {
    height: "100vh",
    display: "flex",
    flexFlow: "nowrap column",
    overflow: "hidden",
  },
  container: {
    margin: 0,
    flexGrow: 3,
    display: "flex",
    flexFlow: "row nowrap",
    height: "100%",
    width: "100%",
    background: "black",
    color: "white",
  },
  resizeHandle: {
    cursor: "ew-resize",
    width: "8px",
    height: "30%",
    margin: "0px -5px",
    background: "#313131",
    border: "2px solid #292929",
    borderRadius: "2px",
    textAlign: "center",
    zIndex: 99999,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
  },
  resizeBorder: {
    cursor: "ew-resize",
    width: "4px",
    background: "#292929",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  sidePanel: {
    flexGrow: 1,
    background: "#700000",
    color: "white",
    width: "100%",
    height: "calc(100vh - 30px)",
    display: "flex",
    flexFlow: "column nowrap",
    textAlign: "center",
  },
  content: {
    flexGrow: 2,
    color: "white",
    width: "100%",
    height: "96%",
    display: "block",
    flexFlow: "column nowrap",
    textAlign: "center",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "0px",
    },
  },
  footer: {
    display: "flex",
    position: "absolute",
    width: "100%",
    bottom: 0,
    flexFlow: "column nowrap",
    textAlign: "center",
    justifyContent: "center",
    height: 30,
    background: "#292929",
    borderTop: "1px solid #000000",
    color: "white",
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: "calc(.5rem + 1vmin)",
  },
  minSidePanel: {
    width: 45,
  },
});

document.title = "Just An Idea";

/**
 * The root of the application
 * Contains the logged in user's state
 * Handles the routes
 */
export default function App() {
  const styles = useStyles();
  const [displaySidePanel, setDisplaySidePanel] = useState(
    GetSidePanel !== null ? GetSidePanel : true
  );
  const [currentUser, setCurrentUser] = useState();

  const reloadPinsRef = useRef();

  const retreieveStoredUser = useCallback(() => {
    if (IsLoggedIn()) {
      const user = GetCurrentUser();
      console.log("Retrieving Stored User with id", user.user_id);
      publicAxios
        .get(`/account/user/${user.user_id}`)
        .then((credentialsResponse) => {
          console.log("Stored User response", credentialsResponse);
          if (credentialsResponse?.data === "") {
            console.log("Stored User not found");
            LogOut();
            history.push(`/login`);
            return;
          }
          if (credentialsResponse?.data.credentials.suspended !== 0) {
            console.log("Stored User has been suspended");
            LogOut();
            history.push(`/login`);
            return;
          }
          console.log("Setting Current User from local storage", user);
          setCurrentUser({
            user_id: user.user_id,
            role: user.role,
          });
        })
        .catch((error) => {
          console.log("Log in error", error);
        });
    }
  }, []);

  useEffect(() => {
    retreieveStoredUser();
  }, [retreieveStoredUser]);

  const toggleSidePanel = () => {
    SaveSidePanel(!displaySidePanel);
    setDisplaySidePanel(!displaySidePanel);
  };

  return (
    <div className={styles.body}>
      <Router history={history}>
        <div className={styles.container}>
          {displaySidePanel ? (
            <ResizePanel
              direction="e"
              handleClass={styles.resizeHandle}
              borderClass={styles.resizeBorder}
              style={{
                width: "13%",
                height: "100%",
              }}
            >
              <div className={styles.sidePanel}>
                <SidePanel
                  currentUser={currentUser}
                  reloadPinsRef={reloadPinsRef}
                />
              </div>
            </ResizePanel>
          ) : (
            <div className={styles.minSidePanel}>
              <MinSidePanel currentUser={currentUser} />
            </div>
          )}

          <div className={styles.content}>
            <SearchBar toggleSidePanel={toggleSidePanel} />
            <Switch>
              <PrivateRoute
                component={Profile}
                path="/profile"
                exact
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
              <PrivateRoute
                component={MyUpvotes}
                path="/upvotes"
                currentUser={currentUser}
              />
              <PrivateRoute
                component={MyPins}
                path="/pins"
                currentUser={currentUser}
                reloadPinsRef={reloadPinsRef}
              />
              <PrivateRoute
                component={Post}
                path="/post"
                currentUser={currentUser}
              />
              <PrivateRoute
                component={Logout}
                path="/logout"
                setCurrentUser={setCurrentUser}
              />
              <PublicRoute
                component={Profile}
                path="/profile/:userId"
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
              <PublicRoute
                component={Login}
                path="/login"
                restricted={true}
                setCurrentUser={setCurrentUser}
              />
              <PublicRoute
                component={Registration}
                path="/registration"
                restricted={true}
              />
              <PublicRoute component={Home} path="/home" />
              <PublicRoute component={About} path="/about" />
              <PublicRoute
                component={SearchResults}
                path="/search/:searchString"
              />
              <PublicRoute
                component={Topic}
                path="/topic/:topicId"
                currentUser={currentUser}
                reloadPinsRef={reloadPinsRef}
              />
              <PublicRoute
                component={Idea}
                path="/idea/:ideaId"
                currentUser={currentUser}
              />
              <PublicRoute component={Welcome} path="/" />
            </Switch>
          </div>
        </div>

        <div className={styles.footer}>Copyright &copy; 2021 Henry Harvey</div>
      </Router>
    </div>
  );
}
