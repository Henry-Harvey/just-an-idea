import React from "react";
import axios from "axios";
import history from "../../../utils/history";
import DeleteIdeaView from "./view";

export default function DeleteIdea({ ideaState, toggleDeleteDialog }) {
  const handleSubmitDelete = () => {
    console.log("Delete Idea with id", ideaState.idea.id);
    axios
      .delete(`http://localhost:8080/content/idea/${ideaState.idea.id}`)
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
