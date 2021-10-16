import React from "react";
import { authAxios } from "../../../utils";
import history from "../../../utils/history";
import DeleteIdeaView from "./view";

/**
 * Displays a dialog for deletion confirmation
 * Allows a user to delete an idea
 */
export default function DeleteIdea({
  currentUser,
  ideaState,
  toggleDeleteDialog,
}) {
  const handleSubmitDelete = () => {
    console.log("Delete Idea with id", ideaState.idea.id);
    authAxios
      .delete(`/content/idea/${ideaState.idea.id}`)
      .then((ideaResponse) => {
        console.log("Delete Idea response", ideaResponse);
        toggleDeleteDialog();
        history.push(`/profile`);
      })
      .catch((error) => {
        console.log("Delete Idea error", error);
      });
  };

  return (
    <React.Fragment>
      <DeleteIdeaView
        ideaState={ideaState}
        toggleDeleteDialog={toggleDeleteDialog}
        handleSubmitDelete={handleSubmitDelete}
      />
    </React.Fragment>
  );
}
