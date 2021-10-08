import React from "react";
import { makeStyles, TextField, Tooltip, IconButton } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import clsx from "clsx";
import { Link } from "react-router-dom";
import DeleteComment from "./DeleteComment";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "calc(1.25rem + 1vmin)",
    marginBottom: "0.35em",
  },
  form: {
    background: "#292929",
    padding: 10,
    borderRadius: 10,
    marginInline: "1.5%",
    marginBottom: "1em",
  },
  linkSize: {
    width: "100%",
    color: "white",
  },
  link: {
    textDecorationColor: "white",
    cursor: "pointer",
  },
  textField: {
    width: "85%",
    maxWidth: 1200,
    marginBottom: "2%",
    overflow: "hidden",
    color: "white",
    "& .MuiInputBase-input": {
      color: "white",
      fontSize: "calc(.33rem + 2vmin)",
      cursor: "inherit",
    },
    "& label": {
      color: "white",
      fontSize: "calc(1rem + .5vmin)",
    },
    "& .MuiFormLabel-root.Mui-disabled": {
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
    "& .MuiInputBase-root.Mui-disabled": {
      cursor: "inherit",
    },
  },
  multiline: {
    "& .MuiInputBase-input": {
      fontSize: "calc(1rem + .5vmin)",
    },
  },
  upvote: {
    display: "flex",
    marginLeft: "9%",
    height: 40,
    "& .MuiSvgIcon-root": {
      fontSize: "2rem",
    },
  },
}));

export default function CommentView({
  currentUser,
  retreieveIdea,
  comment,
  commentState,
  isUsersComment,
  toggleDeleteDialog,
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <div className={styles.form}>
        <TextField
          id="content"
          value={comment.content}
          className={clsx(styles.textField, styles.multiline)}
          multiline
          disabled
          maxRows={15}
        />
        <div className={styles.linkSize}>
          <Link to={"/profile/" + comment.user.id} className={styles.link}>
            <TextField
              id="comment_author"
              value={comment.user.display_name}
              className={styles.textField}
              disabled
            />
          </Link>
        </div>
        <TextField
          id="comment_timestamp"
          value={comment.timestamp}
          className={styles.textField}
          disabled
        />
        {isUsersComment ? (
          <div>
            <Tooltip title="Delete Comment">
              <IconButton
                className={styles.iconButton}
                onClick={toggleDeleteDialog}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        ) : null}
        {!isUsersComment && currentUser?.role === 1 ? (
          <div>
            <Tooltip title="Admin Delete Comment">
              <IconButton
                className={styles.iconButton}
                onClick={toggleDeleteDialog}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        ) : null}
      </div>
      <DeleteComment
        currentUser={currentUser}
        retreieveIdea={retreieveIdea}
        comment={comment}
        commentState={commentState}
        toggleDeleteDialog={toggleDeleteDialog}
      />
    </React.Fragment>
  );
}
