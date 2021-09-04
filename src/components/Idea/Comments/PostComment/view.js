import React from "react";
import {
  makeStyles,
  Typography,
  TextField,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { ArrowForwardIos as ProceedIcon } from "@material-ui/icons";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "calc(1rem + .5vmin)",
    marginBottom: "0.25em",
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
    marginBottom: "1.5em",
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
    color: "white",
  },
  message: {
    color: "red",
  },
  button: {
    marginTop: 10,
    background: "black",
    color: "white",
  },
  hidden: {
    display: "none",
  },
}));

export default function PostCommentView({
  commentsState,
  postCommentState,
  handleChange,
  handleKeyPress,
  handleSubmit,
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <div
        className={
          commentsState.displayPostComment ? styles.form : styles.hidden
        }
      >
        <Typography className={styles.title}>Post Comment</Typography>
        <TextField
          id="content"
          value={postCommentState?.comment.content}
          onChange={handleChange("comment", "content")}
          onKeyPress={handleKeyPress()}
          className={clsx(styles.textField, styles.multiline)}
          multiline
          rows={3}
        />
        <Typography className={styles.message}>
          {postCommentState.message}
        </Typography>
        <Tooltip title="Post Comment">
          <IconButton className={styles.iconButton} onClick={handleSubmit}>
            <ProceedIcon />
          </IconButton>
        </Tooltip>
      </div>
    </React.Fragment>
  );
}
