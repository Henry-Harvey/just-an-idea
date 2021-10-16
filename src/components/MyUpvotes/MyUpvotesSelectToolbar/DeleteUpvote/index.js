import React from "react";
import { authAxios } from "../../../../utils";
import DeleteUpvoteView from "./view";

/**
 * Displays a dialog for deletion confirmation
 * Allows a user to delete an upvote from an idea
 */
export default function DeleteUpvote({
  selectedUpvote,
  currentUser,
  retreieveMyUpvotes,
  toggleDeleteDialog,
  myUpvotesSelectToolbarState,
}) {
  const handleSubmitDelete = () => {
    console.log(
      "Delete Upvote with user_id & idea_id",
      currentUser?.user_id,
      selectedUpvote.idea.id
    );
    authAxios
      .delete(
        `/content/upvote/${currentUser?.user_id}/${selectedUpvote.idea.id}`
      )
      .then((upvoteResponse) => {
        console.log("Delete Upvote response", upvoteResponse);
        toggleDeleteDialog();
        retreieveMyUpvotes();
      })
      .catch((error) => {
        console.log("Delete Upvote error", error);
      });
  };

  return (
    <React.Fragment>
      <DeleteUpvoteView
        selectedUpvote={selectedUpvote}
        myUpvotesSelectToolbarState={myUpvotesSelectToolbarState}
        toggleDeleteDialog={toggleDeleteDialog}
        handleSubmitDelete={handleSubmitDelete}
      />
    </React.Fragment>
  );
}
