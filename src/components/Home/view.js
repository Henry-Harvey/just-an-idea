import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import MostUpvotedIdeas from "./MostUpvotedIdeas";
import MostCommentedIdeas from "./MostCommentedIdeas";
import MostPinnedTopics from "./MostPinnedTopics";
import MostIdeaTopics from "./MostIdeaTopics";

const useStyles = makeStyles((theme) => ({
  // background: {
  //   backgroundImage: "url(/images/jai-logo-alt.jpg)",
  //   backgroundRepeat: "no-repeat",
  //   backgroundSize: "contain",
  //   backgroundColor: "black",
  // },
  title: {
    fontSize: "calc(1.25rem + 1vmin)",
    marginBottom: "0.35em",
  },
}));

export default function HomeView({ homeState }) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <div className={styles.background}>
        <Typography className={styles.title}>Home</Typography>
        <MostUpvotedIdeas homeState={homeState} />
        <MostCommentedIdeas homeState={homeState} />
        <MostPinnedTopics homeState={homeState} />
        <MostIdeaTopics homeState={homeState} />
      </div>
    </React.Fragment>
  );
}
