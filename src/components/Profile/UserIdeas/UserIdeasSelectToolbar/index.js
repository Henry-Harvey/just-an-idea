import React, { useState } from "react";
import UserIdeasSelectToolbarView from "./view";
import DeleteIdea from "./DeleteIdea";

export default function UserIdeasSelectToolbar({
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
        retreieveProfile={retreieveProfile}
        setUserIdeasSelectToolbar={setUserIdeasSelectToolbar}
        selectedIdea={selectedIdea}
        userIdeasSelectToolbarState={userIdeasSelectToolbarState}
        toggleDeleteDialog={toggleDeleteDialog}
      />
    </React.Fragment>
  );
}
