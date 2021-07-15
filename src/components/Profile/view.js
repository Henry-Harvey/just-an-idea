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
  state,
  userId,
  isUsersProfile,
  setCurrentUser
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Typography className={styles.title}>
        {isUsersProfile ?
          "My Profile"
          :
          state.title + `'s Profile`
        }
      </Typography>
      <div className={styles.container}>
        <div className={styles.item}>
          <UserInfo
            userId={userId}
            isUsersProfile={isUsersProfile}
            setCurrentUser={setCurrentUser}
          />
        </div>
        <div className={styles.item}>
          <UserIdeas
            userId={userId}
            isUsersProfile={isUsersProfile}
          />
        </div>
      </div>
    </React.Fragment>
  );
}