import React from "react";
import {
  makeStyles,
  Typography,
  ImageList,
  ImageListItem,
  Tooltip,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "calc(1.25rem + 1vmin)",
    marginBottom: "0.35em",
  },
  textBody: {
    textAlign: "center",
    letterSpacing: 0.5,
    fontSize: "calc(1rem + .5vmin)",
    marginLeft: 100,
    marginRight: 100,
  },
  pics: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  imageList: {
    width: 500,
    height: 600,
  },
}));

export default function AboutView() {
  const styles = useStyles();

  const pics = [
    {
      img: "/images/spring-boot.png",
      title: "Spring Boot",
      cols: 2,
    },
    {
      img: "/images/mysql.png",
      title: "MySQL",
    },
    {
      img: "/images/react.png",
      title: "React",
      cols: 2,
    },
    {
      img: "/images/postman.png",
      title: "Postman",
    },
    {
      img: "/images/mui.png",
      title: "Material UI",
    },
    {
      img: "/images/aws.png",
      title: "AWS",
    },
  ];

  return (
    <React.Fragment>
      <Typography className={styles.title}>About This App</Typography>
      <br />
      <Typography className={styles.textBody}>
        The web application, Just An Idea, is a forum site for submitting,
        commenting on, and upvoting ideas about any topic. Ideas are the focus
        of the platform, allowing any user to submit ideas relating to any
        overarching topic. This data will be available to the public. The public
        will have the ability to interact with each other through comments and
        upvotes. Inspiration is the goal of the platform. The app will use
        Spring Boot for the back-end, which will handle the logic and database
        connections. The back-end will return JSON data to the React front-end
        via rest controllers. This application will be hosted on an undecided
        cloud service so that it can be widely accessible.
      </Typography>
      <br />
      <Typography className={styles.textBody}>
        The project will be completed in December of 2021.
        <br />
        To contact the developer, email henryy.harveyy@gmail.com
      </Typography>
      <br />
      <Typography className={styles.textBody}>Powered by:</Typography>
      <div className={styles.pics}>
        <ImageList rowHeight={160} className={styles.imageList} cols={3}>
          {pics.map((pic) => (
            <Tooltip title={pic.title} key={pic.img} cols={pic.cols || 1}>
              <ImageListItem>
                <img src={pic.img} alt={pic.title} />
              </ImageListItem>
            </Tooltip>
          ))}
        </ImageList>
      </div>
    </React.Fragment>
  );
}
