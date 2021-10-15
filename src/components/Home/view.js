import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import MostUpvotedIdeas from "./MostUpvotedIdeas";
import MostCommentedIdeas from "./MostCommentedIdeas";
import MostPinnedTopics from "./MostPinnedTopics";
import MostIdeaTopics from "./MostIdeaTopics";
import BeatLoader from "react-spinners/BeatLoader";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "calc(1.25rem + 1vmin)",
    marginBottom: "0.35em",
  },
}));

export default function HomeView({ homeState }) {
  const styles = useStyles();

  return (
    <React.Fragment>
      {homeState?.isLoading ? (
        <BeatLoader
          color={"#fff"}
          css={
            "display: flex; justify-content: center; align-items: center; height: 80%"
          }
          size={20}
        />
      ) : (
        <div className={styles.background}>
          <Typography className={styles.title}>Home</Typography>
          <MostUpvotedIdeas homeState={homeState} />
          <MostCommentedIdeas homeState={homeState} />
          <MostPinnedTopics homeState={homeState} />
          <MostIdeaTopics homeState={homeState} />
        </div>
      )}
    </React.Fragment>
  );
}
