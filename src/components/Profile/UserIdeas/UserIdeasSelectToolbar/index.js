import React, { useState } from "react";
import UserIdeasSelectToolbarView from "./view";
import DeleteIdea from "./DeleteIdea";

/**
 * Allows a user to navigate to an idea
 * Allows a user to navigate to an idea's topic
 * Allows a user to open the delete dialog for an idea
 */
export default function UserIdeasSelectToolbar({
  currentUser,
  isUsersProfile,
  retreieveProfile,
  setUserIdeasSelectToolbar,
  selectedIdea,
}) {
  const [userIdeasSelectToolbarState, setUserIdeasSelectToolbarState] =
    useState({
      isDeleteDialogOpen: false,
    });

  const toggleDeleteDialog = () => {
    setUserIdeasSelectToolbarState((state) => ({
      ...state,
      isDeleteDialogOpen: !state.isDeleteDialogOpen,
    }));
  };

  return (
    <React.Fragment>
      <UserIdeasSelectToolbarView
        selectedIdea={selectedIdea}
        isUsersProfile={isUsersProfile}
        toggleDeleteDialog={toggleDeleteDialog}
      />
      <DeleteIdea
        currentUser={currentUser}
        retreieveProfile={retreieveProfile}
        // setUserIdeasSelectToolbar={setUserIdeasSelectToolbar}
        selectedIdea={selectedIdea}
        userIdeasSelectToolbarState={userIdeasSelectToolbarState}
        toggleDeleteDialog={toggleDeleteDialog}
      />
    </React.Fragment>
  );
}
