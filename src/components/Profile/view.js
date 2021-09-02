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
  profileState,
  isUsersProfile,
  setCurrentUser,
  updateUser,
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Typography className={styles.title}>
        {isUsersProfile
          ? "My Profile"
          : profileState.user.display_name + `'s Profile`}
      </Typography>
      <div className={styles.container}>
        <div className={styles.item}>
          <UserInfo
            profileState={profileState}
            isUsersProfile={isUsersProfile}
            setCurrentUser={setCurrentUser}
            updateUser={updateUser}
          />
        </div>
        <div className={styles.item}>
          <UserIdeas
            profileState={profileState}
            isUsersProfile={isUsersProfile}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
