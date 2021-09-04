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
  form: {
    background: "#292929",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    overflowY: "auto",
    marginInline: "10%",
    maxHeight: "77%",
  },
  textField: {
    width: "75%",
    maxWidth: 500,
    minWidth: 100,
    marginBottom: "2%",
    overflow: "hidden",
    color: "white",
    "& .MuiInputBase-input": {
      color: "white",
      fontSize: "calc(.33rem + 2vmin)",
    },
    "& label": {
      color: "white",
      fontSize: "calc(1rem + .5vmin)",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "& label.Mui-focused": {
      color: "#D6D6D6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#D6D6D6",
    },
  },
  multiline: {
    "& .MuiInputBase-input": {
      fontSize: "calc(1rem + .5vmin)",
    },
  },
  iconButton: {
    height: 40,
    display: "flex",
    marginLeft: "9%",
  },
  button: {
    marginTop: 10,
    background: "black",
    color: "white",
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

      {typeof currentUser?.user_id === "number" ? (
        <PostComment
          retreieveIdea={retreieveIdea}
          user_id={currentUser?.user_id}
          idea_id={ideaState.idea.id}
          commentsState={commentsState}
          togglePostComment={togglePostComment}
        />
      ) : null}

      {ideaState.idea?.comments.length > 0 ? (
        ideaState.idea?.comments.map((comment, index) => (
          <Comment
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
