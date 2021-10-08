import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import {
  Room as PinnedIcon,
  RoomOutlined as PinIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";

export default function TopicToolbarView({
  currentUser,
  topicState,
  togglePin,
  toggleDeleteDialog,
}) {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
