import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core'
import { Room as PinnedIcon, RoomOutlined as PinIcon } from '@material-ui/icons';

export default function TopicToolbarView({
  handleTogglePin,
  state
}) {

  return (
    <React.Fragment>
      <Tooltip title={
        state.isPinned ?
          'Pinned Topic'
          :
          'Pin Topic'
      }>
        <IconButton
          onClick={handleTogglePin}>
          {state.isPinned ?
            <PinnedIcon />
            :
            <PinIcon />
          }
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}