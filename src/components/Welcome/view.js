import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: "url(/images/jai-logo-alt.jpg)",
    backgroundSize: 101.5,
    backgroundColor: "black",
    height: "88%",
  },
  title: {
    fontSize: "calc(1.25rem + 1vmin)",
    marginBottom: "0.35em",
  },
  textBody: {
    textAlign: "center",
    letterSpacing: 0.5,
    fontSize: "calc(1rem + .5vmin)",
  },
}));

export default function WelcomeView() {
  const styles = useStyles();

  return (
    <React.Fragment>
      <div className={styles.background}>
        <Typography className={styles.title}>Welcome</Typography>
        <Typography className={styles.textBody}>
          Hello! This is Just An Idea :)
        </Typography>
      </div>
    </React.Fragment>
  );
}
