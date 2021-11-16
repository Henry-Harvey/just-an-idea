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
    borderRadius: 20,
  },
  avatar: {
    backgroundColor: "#504C4C",
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
  cards: {
    marginTop: 15,
  },
  title: {
    backgroundColor: "#700000",
    marginLeft: "3%",
    marginRight: "3%",
    borderRadius: 5,
  },
}));

export default function MostPinnedTopicsView({ mostPinnedTopicsState }) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <div className={styles.cards}>
        <Typography className={styles.title}>Most Pinned Topics</Typography>
        {mostPinnedTopicsState.topics?.map((topic, index) => (
          <Link
            to={"/topic/" + topic.id}
            className={styles.link}
            key={topic.id}
          >
            <Card className={styles.card}>
              <CardHeader
                className={styles.cardHeader}
                avatar={
                  <Avatar className={styles.avatar}>{topic.pins.length}</Avatar>
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
      </div>
    </React.Fragment>
  );
}
