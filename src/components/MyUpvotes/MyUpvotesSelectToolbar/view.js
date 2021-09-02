import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import {
  Visibility as VisibilityIcon,
  ListAlt as TopicIcon,
  Person as PersonIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    marginRight: 24,
  },
  dialogTitle: {
    color: "white",
  },
  dialogContent: {
    color: "white",
  },
  dialogPaper: {
    backgroundColor: "#292929",
  },
}));

export default function MyUpvotesSelectToolbarView({
  selectedUpvote,
  handleToggleDeleteDialog,
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <div className={styles.toolbar}>
        <Link to={"/idea/" + selectedUpvote.idea.id} className={styles.link}>
          <Tooltip title="View Idea">
            <IconButton>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </Link>
        <Link
          to={"/topic/" + selectedUpvote.idea.topic.id}
          className={styles.link}
        >
          <Tooltip title="View Topic">
            <IconButton>
              <TopicIcon />
            </IconButton>
          </Tooltip>
        </Link>
        <Link
          to={"/profile/" + selectedUpvote.idea.user.id}
          className={styles.link}
        >
          <Tooltip title="View Author">
            <IconButton>
              <PersonIcon />
            </IconButton>
          </Tooltip>
        </Link>
        <Tooltip title="Delete">
          <IconButton onClick={handleToggleDeleteDialog}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    </React.Fragment>
  );
}
