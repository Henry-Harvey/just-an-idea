import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "white",
  },
  card: {
    width: 200,
    height: 100,
    display: "inline-block",
    margin: 10,
  },
  avatar: {
    backgroundColor: "#504c4c",
    height: 30,
    width: 30,
  },
  cardHeader: {
    textAlign: "left",
  },
  cardContent: {
    paddingBottom: 0,
  },
  cardFooter: {
    alignSelf: "flex-end",
    marginTop: "auto",
  },
}));

export default function MostIdeaTopicsView({ mostIdeaTopicsState }) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Typography>Most Idea Topics</Typography>
      {mostIdeaTopicsState.topics?.map((topic, index) => (
        <Link to={"/topic/" + topic.id} className={styles.link} key={topic.id}>
          <Card className={styles.card}>
            <CardHeader
              className={styles.cardHeader}
              avatar={
                <Avatar className={styles.avatar}>{topic.ideas.length}</Avatar>
              }
              title={topic.title}
            />
            <CardContent className={styles.cardContent}></CardContent>
            <CardContent className={styles.cardFooter}>
              <Typography variant="body3" component="p">
                {topic.timestamp}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </React.Fragment>
  );
}
