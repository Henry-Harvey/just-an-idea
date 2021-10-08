import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import UserIdeas from "./UserIdeas";
import UserInfo from "./UserInfo";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "calc(1.25rem + 1vmin)",
    marginBottom: "0.35em",
  },
  container: {
    display: "flex",
    height: "auto",
  },
  item: {
    background: "#292929",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginInline: "1%",
    width: "50%",
    justifyContent: "space-between",
  },
}));

export default function ProfileView({
  currentUser,
  setCurrentUser,
  profileState,
  isUsersProfile,
  retreieveProfile,
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      {isNaN(profileState.user.id) ? (
        <Typography className={styles.title}>
          Sorry, this profile does not exist {profileState.user.display_name}
        </Typography>
      ) : (
        <div>
          <Typography className={styles.title}>
            {isUsersProfile
              ? "My Profile"
              : profileState.user.display_name + `'s Profile`}
            {isUsersProfile && currentUser.role === 1 ? " [Admin]" : null}
          </Typography>
          <div className={styles.container}>
            <div className={styles.item}>
              <UserInfo
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                profileState={profileState}
                isUsersProfile={isUsersProfile}
                retreieveProfile={retreieveProfile}
              />
            </div>
            <div className={styles.item}>
              <UserIdeas
                currentUser={currentUser}
                profileState={profileState}
                isUsersProfile={isUsersProfile}
                retreieveProfile={retreieveProfile}
              />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
