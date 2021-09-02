import React, { useState } from 'react';
import UserIdeasSelectToolbarView from './view';
import DeleteIdea from './DeleteIdea'

export default function UserIdeasSelectToolbar({ 
  selectedIdea, 
  isUsersProfile 
}) {

  const [userIdeasSelectToolbarState, setUserIdeasSelectToolbarState] = useState({
    isDeleteDialogOpen: false
  });

  const handleToggleDeleteDialog = () => {
    setUserIdeasSelectToolbarState(state => ({
      ...state,
      isDeleteDialogOpen: !state.isDeleteDialogOpen
    }));
  }

  return (
    <React.Fragment>
      < UserIdeasSelectToolbarView
        selectedIdea={selectedIdea}
        isUsersProfile={isUsersProfile}
        handleToggleDeleteDialog={handleToggleDeleteDialog}
      />
      <DeleteIdea
        selectedIdea={selectedIdea}
        userIdeasSelectToolbarState={userIdeasSelectToolbarState}
        handleToggleDeleteDialog={handleToggleDeleteDialog}
      />
    </React.Fragment>
  );
}