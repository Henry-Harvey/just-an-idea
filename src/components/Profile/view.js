import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import UserIdeas from "./UserIdeas";
import UserInfo from "./UserInfo";
import BeatLoader from "react-spinners/BeatLoader";

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
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "88%",
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
      {isNaN(profileState?.user.id) ? (
        <BeatLoader
          color={"#fff"}
          css={
            "display: flex; justify-content: center; align-items: center; height: 80%"
          }
          size={20}
        />
      ) : profileState?.user.id === -1 ? (
        <Typography className={styles.title}>
          Sorry, this profile does not exist
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
