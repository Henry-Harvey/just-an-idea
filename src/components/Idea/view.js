import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Typography,
  TextField,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import clsx from "clsx";
import Upvote from "./Upvote";
import Comments from "./Comments";
import DeleteIdea from "./DeleteIdea";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "calc(1.25rem + 1vmin)",
    marginBottom: "-1em",
  },
  form: {
    background: "#292929",
    padding: 10,
    borderRadius: 10,
    marginInline: "1.5%",
    marginBottom: "1.5%",
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
    marginLeft: "2%",
    height: 40,
    "& .MuiSvgIcon-root": {
      fontSize: "2rem",
    },
  },
}));

export default function IdeaView({
  currentUser,
  ideaState,
  retreieveIdea,
  toggleDeleteDialog,
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      {isNaN(ideaState.idea.id) ? (
        <Typography className={styles.title}>
          Sorry, this idea does not exist
        </Typography>
      ) : (
        <div>
          <div className={styles.form}>
            <Typography className={styles.title}>
              {ideaState.idea.title}
            </Typography>
            <div className={styles.upvote}>
              <Tooltip title="Upvotes">
                <Typography className={styles.title}>
                  {ideaState.idea.upvotes.length}
                </Typography>
              </Tooltip>
              {currentUser?.user_id === ideaState.idea.user.id ||
              isNaN(currentUser?.user_id) ? null : (
                <Upvote
                  currentUser={currentUser}
                  ideaState={ideaState}
                  retreieveIdea={retreieveIdea}
                />
              )}
            </div>
            <div>
              <TextField
                id="idea_description"
                label="Description"
                value={ideaState.idea.description}
                className={clsx(styles.textField, styles.multiline)}
                multiline
                disabled
                maxRows={15}
              />
              <div className={styles.linkSize}>
                <Link
                  to={"/topic/" + ideaState.idea.topic.id}
                  className={styles.link}
                >
                  <TextField
                    id="idea_topic"
                    label="Topic"
                    value={ideaState.idea.topic.title}
                    className={styles.textField}
                    disabled
                  />
                </Link>
              </div>
              <div className={styles.linkSize}>
                <Link
                  to={"/profile/" + ideaState.idea.user.id}
                  className={styles.link}
                >
                  <TextField
                    id="idea_author"
                    label="Author"
                    value={ideaState.idea.user.display_name}
                    className={styles.textField}
                    disabled
                  />
                </Link>
              </div>
              <TextField
                id="idea_timestamp"
                label="Posted on"
                value={ideaState.idea.timestamp}
                className={styles.textField}
                disabled
              />
            </div>
            {ideaState.idea.user.id === currentUser?.user_id ? (
              <div>
                <Tooltip title="Delete Idea">
                  <IconButton
                    className={styles.iconButton}
                    onClick={toggleDeleteDialog}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            ) : null}
            {ideaState.idea.user.id !== currentUser?.user_id &&
            currentUser?.role === 1 ? (
              <div>
                <Tooltip title="Admin Delete Idea">
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
          <div>
            <Comments
              currentUser={currentUser}
              ideaState={ideaState}
              retreieveIdea={retreieveIdea}
            />
          </div>
          <DeleteIdea
            currentUser={currentUser}
            ideaState={ideaState}
            toggleDeleteDialog={toggleDeleteDialog}
          />
        </div>
      )}
    </React.Fragment>
  );
}
