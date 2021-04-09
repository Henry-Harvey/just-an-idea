import React from 'react';
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 'calc(1.25rem + 1vmin)',
    marginBottom: '0.35em'
  },
  textBody: {
    textAlign: 'center',
    letterSpacing: .5,
    fontSize: 'calc(1rem + .5vmin)',
    marginLeft: 100,
    marginRight: 100
  }
}));

export default function About() {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Typography className={styles.title}>
        About This App
      </Typography>
      <br />
      <Typography className={styles.textBody}>
        The web application, Just An Idea, is a forum site for submitting, commenting on, and upvoting ideas about any topic. Ideas are the focus of the platform, allowing any user to submit ideas relating to any overarching topic. This data will be available to the public. The public will have the ability to interact with each other through comments and upvotes. Inspiration is the goal of the platform. The app will use Spring Boot for the backend, which will handle the logic and database connections. The backend will return JSON data to the React frontend via rest controllers. This application will be hosted on an undecided cloud service so that it can be widely accessible.
      </Typography>
      <br />
      <Typography className={styles.textBody}>
        Powered by:
      </Typography>
      <br />
      <Typography className={styles.textBody}>
        {"<insert photo cards>"}
      </Typography>
      <br />
      <Typography className={styles.textBody}>
        The project will be completed in December of 2021.
        <br />
        To contact the developer, email henryy.harveyy@gmail.com
      </Typography>
    </React.Fragment>
  );
}