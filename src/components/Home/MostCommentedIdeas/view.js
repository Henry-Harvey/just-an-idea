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

export default function MostCommentedIdeasView({ mostCommentedIdeasState }) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Typography>Most Commented Ideas</Typography>
      {mostCommentedIdeasState.ideas?.map((idea, index) => (
        <Link to={"/idea/" + idea.id} className={styles.link} key={idea.id}>
          <Card className={styles.card}>
            <CardHeader
              className={styles.cardHeader}
              avatar={
                <Avatar className={styles.avatar}>
                  {idea.comments.length}
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
    </React.Fragment>
  );
}
