import React from 'react';
import { AppBar, Toolbar, makeStyles, Typography, IconButton, Tooltip } from '@material-ui/core'
import { Home as HomeIcon, Info as InfoIcon, AccountBox as AccountBoxIcon, AddCircle as AddCircleIcon, ExitToApp as ExitToAppIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '1.25rem'
  },
  appBar: {
    width: 'auto',
    margin: 10,
    backgroundColor: '#292929',
    position: 'relative',
    overflow: 'hidden',
  },
  toolbar: {
    display: 'flex -moz-flex -ms-flexbox -webkit-flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    minWidth: 20,
    flexWrap: 'wrap'
  },
  iconButton: {
    cursor: 'pointer',
    color: 'white',
    width: 30
  },
  link: {
    textDecoration: 'none',
    color: 'white'
  }
}));

export default function NavBox({ currentUser }) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <AppBar className={styles.appBar}>
        <Link to='/' className={styles.link}>
          <Typography className={styles.title}>
            Just An Idea
            </Typography>
        </Link>
        <Toolbar className={styles.toolbar}>
          <Link to='/home'>
            <Tooltip title='Home'>
              <IconButton
                className={styles.iconButton}
                onClick={null}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Link to='/about'>
            <Tooltip title='About'>
              <IconButton
                className={styles.iconButton}
                onClick={null}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Link>
          {currentUser ?
            <Link to='/profile' >
              <Tooltip title={currentUser.username + "'s Profile"}>
                <IconButton
                  className={styles.iconButton}
                  onClick={null}>
                  <AccountBoxIcon />
                </IconButton>
              </Tooltip>
            </Link>
            :
            null
          }
          {currentUser ?
            <Link to='/post'>
              <Tooltip title='Post'>
                <IconButton
                  className={styles.iconButton}
                  onClick={null}>
                  <AddCircleIcon />
                </IconButton>
              </Tooltip>
            </Link>
            :
            null
          }
          {currentUser ?
            <Link to='/logout'>
              <Tooltip title='Log out'>
                <IconButton
                  className={styles.iconButton}
                  onClick={null}>
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
            </Link>
            :
            <Link to='/login'>
              <Tooltip title='Log in'>
                <IconButton
                  className={styles.iconButton}
                  onClick={null}>
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
            </Link>
          }

        </Toolbar>
      </AppBar>
    </React.Fragment >
  );
}