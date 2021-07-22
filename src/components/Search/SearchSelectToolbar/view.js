import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core'
import { Visibility as VisibilityIcon } from '@material-ui/icons';

export default function SearchSelectToolbarView({ handleNavigateToItem }) {

  return (
    <React.Fragment>
      <Tooltip title="View">
            <IconButton
              onClick={handleNavigateToItem}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
    </React.Fragment>
  );
}