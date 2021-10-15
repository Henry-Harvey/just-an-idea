import React from "react";
import { makeStyles, Tooltip, IconButton } from "@material-ui/core";
import {
  Room as PinnedIcon,
  RoomOutlined as PinIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    marginRight: 24,
    display: "inline",
  },
}));

export default function TopicToolbarView({
  currentUser,
  topicState,
  togglePin,
  toggleDeleteDialog,
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <div className={styles.toolbar}>
        {!isNaN(currentUser?.user_id) ? (
          <Tooltip title={topicState.isPinned ? "Pinned Topic" : "Pin Topic"}>
            <IconButton onClick={togglePin}>
              {topicState.isPinned ? <PinnedIcon /> : <PinIcon />}
            </IconButton>
          </Tooltip>
        ) : null}

        {currentUser?.role === 1 ? (
          <Tooltip title="Admin Delete Topic">
            <IconButton onClick={toggleDeleteDialog}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </div>
    </React.Fragment>
  );
}
