import React, { useState } from "react";
import MyUpvotesSelectToolbarView from "./view";

export default function MyUpvotesSelectToolbar({
  selectedUpvote,
  currentUser,
  retreieveMyUpvotes,
}) {
  const [myUpvotesSelectToolbarState, setMyUpvotesSelectToolbarState] =
    useState({
      isDeleteDialogOpen: false,
    });

  const toggleDeleteDialog = () => {
    setMyUpvotesSelectToolbarState((state) => ({
      ...state,
      isDeleteDialogOpen: !state.isDeleteDialogOpen,
    }));
  };

  return (
    <React.Fragment>
      <MyUpvotesSelectToolbarView
        selectedUpvote={selectedUpvote}
        toggleDeleteDialog={toggleDeleteDialog}
        myUpvotesSelectToolbarState={myUpvotesSelectToolbarState}
        currentUser={currentUser}
        retreieveMyUpvotes={retreieveMyUpvotes}
      />
    </React.Fragment>
  );
}
