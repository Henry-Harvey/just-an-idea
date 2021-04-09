import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core'
import ResizePanel from 'react-resize-panel';
// eslint-disable-next-line no-unused-vars
import style from './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history"

import SidePanel from './components/SidePanel'
import SearchBar from './components/SearchBar'
import Home from './components/Home'
import About from './components/About'
import Profile from './components/Profile'
import Post from './components/Post'
import Login from './components/Login'
import Logout from './components/Logout'
import Search from './components/Search'
import Topic from './components/Topic'
import Welcome from './components/Welcome'
import PublicRoute from "./components/Routes/PublicRoute";
import PrivateRoute from "./components/Routes/PrivateRoute";

const useStyles = makeStyles({
  body: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexFlow: 'nowrap column',
    overflow: 'hidden'
  },
  container: {
    margin: 0,
    flexGrow: 3,
    display: 'flex',
    flexFlow: 'row nowrap',
    height: '100%',
    width: '100%',
    background: 'black',
    color: 'white'
  },
  resizeHandle: {
    cursor: 'ew-resize',
    width: '10px',
    height: '200px',
    margin: '0px -5px',
    background: 'rgb(49, 49, 49)',
    border: '2px solid rgb(41, 41, 41)',
    borderRadius: '2px',
    textAlign: 'center',
    zIndex: 99999,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center'
  },
  resizeBorder: {
    cursor: 'ew-resize',
    width: '5px',
    background: 'rgb(41, 41, 41)',
    display: 'flex',
    zIndex: 99999,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'visible'
  },
  // panel: {
  //   alignItems: 'stretch',
  //   justifyContent: 'flex-start',
  //   flexDirection: 'column',
  //   position: 'relative',
  // },
  sidePanel: {
    background: 'rgb(112,0,0)',
    color: 'white',
    width: '100%',
    height: '96%',
    display: 'flex',
    flexFlow: 'column nowrap',
    flexGrow: 1,
    textAlign: 'center',
  },
  content: {
    flexGrow: 2,
    textAlign: 'center',
    color: 'white',
    width: '100%',
    height: '96%',
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  footer: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    flexFlow: 'column nowrap',
    textAlign: 'center',
    justifyContent: 'center',
    height: '4%',
    background: 'rgb(41, 41, 41)',
    borderTop: '1px solid rgb(0, 0, 0)',
    color: 'white'
  }
});

document.title = 'Just An Idea';

export default function App() {
  const styles = useStyles();
  const [displaySidePanel, setDisplaySidePanel] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    user_id: -1,
    credentials_id: -1,
    role: -1,
    username: ''
  });
  const history = createBrowserHistory()

  const toggleSidePanel = () => {
    setDisplaySidePanel(!displaySidePanel);
  }

  return (
    <div className={styles.body}>
      <BrowserRouter history={history}>
        <div className={styles.container}>
          <ResizePanel
            direction='e'
            handleClass={styles.resizeHandle}
            borderClass={styles.resizeBorder}
            style={{ display: displaySidePanel ? 'flex' : 'none', width: '15%', height: '100%' }}
          >
            <div className={styles.sidePanel}>
              <SidePanel
                currentUser={currentUser}
              />
            </div>
          </ResizePanel>

          <div className={styles.content}>
            <SearchBar
              toggleSidePanel={toggleSidePanel}
            />
            <Switch>
              <PrivateRoute component={Profile} path="/profile" exact currentUser={currentUser} />
              <PrivateRoute component={Post} path="/post" />
              <PrivateRoute component={Logout} path="/logout" setCurrentUser={setCurrentUser} />
              <PublicRoute component={Login} path="/login" restricted={true} setCurrentUser={setCurrentUser} />
              <PublicRoute component={Home} path="/home" />
              <PublicRoute component={About} path="/about" />
              <PublicRoute component={Search} path="/search/:searchString" />
              <PublicRoute component={Topic} path="/topic/:topicId" />
              <PublicRoute component={Welcome} path="/" />
            </Switch>
          </div>
        </div>

        <div className={styles.footer}>
          Copyright &copy; 2021 Henry Harvey
      </div>
      </BrowserRouter>
    </div>
  );
}
