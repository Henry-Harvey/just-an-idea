import React, { useState } from 'react';
import MyUpvotesSelectToolbarView from './view';
import DeleteUpvote from './DeleteUpvote'

export default function MyUpvotesSelectToolbar({ selectedIdea, currentUser }) {
  const [state, setState] = useState({
    isDeleteDialogOpen: false
  });

  const handleToggleDeleteDialog = () => {
    setState(state => ({
      ...state,
      isDeleteDialogOpen: !state.isDeleteDialogOpen
    }));
  };

  return (
    <React.Fragment>
      < MyUpvotesSelectToolbarView
        selectedIdea={selectedIdea}
        handleToggleDeleteDialog={handleToggleDeleteDialog}
      />
      <DeleteUpvote
        selectedIdea={selectedIdea}
        handleToggleDeleteDialog={handleToggleDeleteDialog}
        state={state}
        currentUser={currentUser}
      />
    </React.Fragment>
  );
}