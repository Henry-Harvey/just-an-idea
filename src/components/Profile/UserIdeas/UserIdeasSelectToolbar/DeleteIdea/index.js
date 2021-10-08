import React from "react";
import axios from "axios";
import DeleteIdeaView from "./view";

/**
 * Displays a dialog for deletion confirmation
 * Allows a user to delete an idea
 */
export default function DeleteIdea({
  currentUser,
  retreieveProfile,
  // setUserIdeasSelectToolbar,
  selectedIdea,
  userIdeasSelectToolbarState,
  toggleDeleteDialog,
}) {
  const handleSubmitDelete = () => {
    console.log("Delete Idea with id", selectedIdea.id);
    axios
      .delete(`http://localhost:8080/content/idea/${selectedIdea.id}`, {
        auth: currentUser?.auth,
      })
      .then((ideaResponse) => {
        console.log("Delete Idea response", ideaResponse);
        toggleDeleteDialog();
        retreieveProfile();
        // setUserIdeasSelectToolbar();
      })
      .catch((error) => {
        console.log("Delete Idea error", error);
      });
  };

  return (
    <React.Fragment>
      <DeleteIdeaView
        selectedIdea={selectedIdea}
        userIdeasSelectToolbarState={userIdeasSelectToolbarState}
        toggleDeleteDialog={toggleDeleteDialog}
        handleSubmitDelete={handleSubmitDelete}
      />
    </React.Fragment>
  );
}
