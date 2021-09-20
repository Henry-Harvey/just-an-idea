import React from "react";
import { makeStyles, IconButton, Tooltip } from "@material-ui/core";
import {
  KeyboardArrowUp as NotUpvotedIcon,
  ArrowDropUp as UpvotedIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  IconButton: {
    width: 33,
  },
}));

export default function UpvoteView({ ideaState, toggleUpvote }) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Tooltip title={ideaState.isUpvoted ? "Upvoted" : "Upvote"}>
        <IconButton onClick={toggleUpvote} className={styles.IconButton}>
          {ideaState.isUpvoted ? <UpvotedIcon /> : <NotUpvotedIcon />}
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}
