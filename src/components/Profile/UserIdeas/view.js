import React from 'react';
import MUIDataTable from 'mui-datatables';
import { Tooltip, IconButton } from '@material-ui/core'
import { AddCircle as AddCircleIcon } from '@material-ui/icons';

export default function UserIdeasView({
  state,
  handleNavigateToPost
}) {

  return (
    <React.Fragment>
      <MUIDataTable
        title={"Ideas"}
        data={state.ideas}
        columns={state.table.columns}
        options={state.table.options}
      />
      <div>
        <Tooltip title='Post a New Idea'>
          <IconButton
            onClick={handleNavigateToPost}>
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      </div>
    </React.Fragment >
  );
}