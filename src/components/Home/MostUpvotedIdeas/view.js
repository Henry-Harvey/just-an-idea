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
    height: 200,
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

export default function MostUpvotedIdeasView({ mostUpvotedIdeasState }) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <div className={styles.cards}>
        <Typography className={styles.title}>Most Upvoted Ideas</Typography>
        {mostUpvotedIdeasState.ideas?.map((idea, index) => (
          <Link to={"/idea/" + idea.id} className={styles.link} key={idea.id}>
            <Card className={styles.card}>
              <CardHeader
                className={styles.cardHeader}
                avatar={
                  <Avatar className={styles.avatar}>
                    {idea.upvotes.length}
                  </Avatar>
                }
                title={idea.title}
                subheader={"by " + idea.user.display_name}
              />
              <CardContent className={styles.cardContent}>
                <Typography variant="body2" component="p">
                  {idea.description.length > 50
                    ? idea.description.substring(0, 40) + "..."
                    : idea.description}
                </Typography>
              </CardContent>
              <CardContent className={styles.cardFooter}>
                <Typography variant="body3" component="p">
                  {idea.topic.title}
                </Typography>
                <Typography variant="body3" component="p">
                  {idea.timestamp}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
}
