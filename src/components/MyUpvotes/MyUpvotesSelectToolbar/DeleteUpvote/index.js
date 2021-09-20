import React from "react";
import axios from "axios";
import DeleteUpvoteView from "./view";

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
    axios
      .delete(
        `http://localhost:8080/content/upvote/${currentUser?.user_id}/${selectedUpvote.idea.id}`
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
