import React from "react";
import { makeStyles, Typography, Tooltip, IconButton } from "@material-ui/core";
import {
  PostAddSharp as PostAddSharpIcon,
  PostAddRounded as PostAddRoundedIcon,
} from "@material-ui/icons";
import PostComment from "./PostComment";
import Comment from "./Comment";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "calc(1.25rem + 1vmin)",
    marginBottom: "-1em",
  },
  iconButton: {
    height: 40,
    display: "flex",
    marginLeft: "4%",
  },
}));

export default function CommentsView({
  currentUser,
  ideaState,
  retreieveIdea,
  commentsState,
  togglePostComment,
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Typography className={styles.title}>Comments</Typography>
      {typeof currentUser?.user_id === "number" ? (
        <Tooltip
          title={
            commentsState.displayPostComment
              ? "Hide Post Comment"
              : "Show Post Comment"
          }
        >
          <IconButton
            className={styles.iconButton}
            edge="start"
            onClick={togglePostComment}
          >
            {commentsState.displayPostComment ? (
              <PostAddRoundedIcon />
            ) : (
              <PostAddSharpIcon />
            )}
          </IconButton>
        </Tooltip>
      ) : null}

      {typeof currentUser?.user_id === "number" &&
      typeof ideaState.idea?.id === "number" ? (
        <PostComment
          currentUser={currentUser}
          retreieveIdea={retreieveIdea}
          user_id={currentUser?.user_id}
          idea_id={ideaState.idea?.id}
          commentsState={commentsState}
          togglePostComment={togglePostComment}
        />
      ) : null}
      <br />
      {ideaState.idea?.comments.length > 0 ? (
        ideaState.idea?.comments.map((comment, index) => (
          <Comment
            key={comment.id}
            currentUser={currentUser}
            retreieveIdea={retreieveIdea}
            comment={comment}
          />
        ))
      ) : (
        <div>This idea has no comments yet</div>
      )}
    </React.Fragment>
  );
}
