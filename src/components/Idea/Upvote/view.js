import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { KeyboardArrowUp as NotUpvotedIcon, ArrowDropUp as UpvotedIcon } from '@material-ui/icons';

export default function UpvoteView({
  ideaState,
  toggleUpvote
}) {

  return (
    <React.Fragment>
      <Tooltip title={
        ideaState.isUpvoted ?
          'Upvoted'
          :
          'Upvote'
      }>
        <IconButton
          onClick={toggleUpvote}>
          {ideaState.isUpvoted ?
            <UpvotedIcon />
            :
            <NotUpvotedIcon />
          }
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}