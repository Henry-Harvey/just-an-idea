import React, { useState } from 'react';
import UserIdeasSelectToolbarView from './view';
import DeleteIdea from './DeleteIdea'

export default function UserIdeasSelectToolbar({ selectedIdea, isUsersProfile }) {

  const [state, setState] = useState({
    isDeleteDialogOpen: false
  });

  const handleToggleDeleteDialog = () => {
    setState(state => ({
      ...state,
      isDeleteDialogOpen: !state.isDeleteDialogOpen
    }));
  }

  return (
    <React.Fragment>
      < UserIdeasSelectToolbarView
        isUsersProfile={isUsersProfile}
        selectedIdea={selectedIdea}
        state={state}
        handleToggleDeleteDialog={handleToggleDeleteDialog}
      />
      <DeleteIdea
        selectedIdea={selectedIdea}
        handleToggleDeleteDialog={handleToggleDeleteDialog}
        state={state}
      />
    </React.Fragment>
  );
}