import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { KeyboardArrowUp as NotUpvotedIcon, ArrowDropUp as UpvotedIcon } from '@material-ui/icons';

export default function IdeaView({
  state,
  handleToggleUpvote
}) {

  return (
    <React.Fragment>
      <Tooltip title={
        state.isUpvoted ?
          'Upvoted'
          :
          'Upvote'
      }>
        <IconButton
          onClick={handleToggleUpvote}>
          {state.isUpvoted ?
            <UpvotedIcon />
            :
            <NotUpvotedIcon />
          }
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}