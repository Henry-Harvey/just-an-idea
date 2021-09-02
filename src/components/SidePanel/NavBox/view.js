import React from 'react';
import { AppBar, Toolbar, makeStyles, Typography, IconButton, Tooltip } from '@material-ui/core'
import { Home as HomeIcon, Info as InfoIcon, AccountBox as AccountIcon, AddBox as PostIcon, ExitToApp as LogInOutIcon, Assignment as RegistrationIcon, ArrowDropDownCircle as UpvotesIcon } from '@material-ui/icons';
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
    justifyContent: 'space-evenly',
    minWidth: 20,
    flexWrap: 'wrap'
  },
  iconButton: {
    width: 33,
    padding: 8
  },
  upsideDownIconButton: {
    width: 33,
    padding: 8,
    transform: 'rotate(180deg)'
  },
  link: {
    textDecoration: 'none',
    color: 'white'
  }
}));

export default function NavBoxView({ currentUser }) {
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
          {currentUser
            ?
            <Link to='/profile' >
              <Tooltip title='My Profile'>
                <IconButton
                  className={styles.iconButton}
                  onClick={null}>
                  <AccountIcon />
                </IconButton>
              </Tooltip>
            </Link>
            :
            null
          }
          {currentUser
            ?
            <Link to='/upvotes' >
              <Tooltip title={'My Upvotes'}>
                <IconButton
                  className={styles.upsideDownIconButton}
                  onClick={null}>
                  <UpvotesIcon />
                </IconButton>
              </Tooltip>
            </Link>
            :
            null
          }
          {currentUser
            ?
            <Link to='/post'>
              <Tooltip title='Post'>
                <IconButton
                  className={styles.iconButton}
                  onClick={null}>
                  <PostIcon />
                </IconButton>
              </Tooltip>
            </Link>
            :
            null
          }
          {currentUser
            ?
            null
            :
            <Link to='/registration'>
              <Tooltip title='Registration'>
                <IconButton
                  className={styles.iconButton}
                  onClick={null}>
                  <RegistrationIcon />
                </IconButton>
              </Tooltip>
            </Link>
          }
          {currentUser
            ?
            <Link to='/logout'>
              <Tooltip title='Log out'>
                <IconButton
                  className={styles.iconButton}
                  onClick={null}>
                  <LogInOutIcon />
                </IconButton>
              </Tooltip>
            </Link>
            :
            <Link to='/login'>
              <Tooltip title='Login'>
                <IconButton
                  className={styles.iconButton}
                  onClick={null}>
                  <LogInOutIcon />
                </IconButton>
              </Tooltip>
            </Link>
          }
        </Toolbar>
      </AppBar>
    </React.Fragment >
  );
}