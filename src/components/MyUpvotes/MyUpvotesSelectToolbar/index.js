import React, { useState } from "react";
import MyUpvotesSelectToolbarView from "./view";
import DeleteUpvote from "./DeleteUpvote";

export default function MyUpvotesSelectToolbar({
  selectedUpvote,
  currentUser,
}) {
  const [myUpvotesSelectToolbarState, setMyUpvotesSelectToolbarState] =
    useState({
      isDeleteDialogOpen: false,
    });

  const handleToggleDeleteDialog = () => {
    setMyUpvotesSelectToolbarState((state) => ({
      ...state,
      isDeleteDialogOpen: !state.isDeleteDialogOpen,
    }));
  };

  return (
    <React.Fragment>
      <MyUpvotesSelectToolbarView
        selectedUpvote={selectedUpvote}
        handleToggleDeleteDialog={handleToggleDeleteDialog}
      />
      <DeleteUpvote
        selectedUpvote={selectedUpvote}
        handleToggleDeleteDialog={handleToggleDeleteDialog}
        myUpvotesSelectToolbarState={myUpvotesSelectToolbarState}
        currentUser={currentUser}
      />
    </React.Fragment>
  );
}
