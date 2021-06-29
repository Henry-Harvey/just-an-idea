import React from 'react';
import { makeStyles, Typography } from '@material-ui/core'
import UserIdeas from './UserIdeas';
import UserInfo from './UserInfo';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 'calc(1.25rem + 1vmin)',
    marginBottom: '0.35em'
  },
  container: {
    display: 'flex',
    height: 'auto'
  },
  item: {
    background: '#292929',
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginInline: '2%',
    width: '50%',
    justifyContent: 'space-between'
  }
}));

export default function ProfileView({
  currentUser,
  setCurrentUser
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Typography className={styles.title}>
        My Profile
      </Typography>
      <div className={styles.container}>
        <div className={styles.item}>
          <UserInfo
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </div>
        <div className={styles.item}>
          <UserIdeas
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </div>
      </div>
    </React.Fragment>
  );
}