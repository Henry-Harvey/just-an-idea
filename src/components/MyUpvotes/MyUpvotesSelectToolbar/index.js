import React, { useState } from "react";
import MyUpvotesSelectToolbarView from "./view";

/**
 * Allows a user to navigate to an upvoted idea
 * Allows a user to navigate to an upvoted idea's topic
 * Allows a user to navigate to an upvoted idea's author
 * Allows a user to open the delete dialog for an upvote
 */
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
