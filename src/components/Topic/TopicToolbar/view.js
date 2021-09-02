import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core'
import { Room as PinnedIcon, RoomOutlined as PinIcon } from '@material-ui/icons';

export default function TopicToolbarView({
  topicState,
  togglePin
}) {

  return (
    <React.Fragment>
      <Tooltip title={
        topicState.isPinned ?
          'Pinned Topic'
          :
          'Pin Topic'
      }>
        <IconButton
          onClick={togglePin}>
          {topicState.isPinned ?
            <PinnedIcon />
            :
            <PinIcon />
          }
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}