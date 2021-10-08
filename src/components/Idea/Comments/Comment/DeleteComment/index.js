import React from "react";
import axios from "axios";
import DeleteCommentView from "./view";

/**
 * Displays a dialog for deletion confirmation
 * Allows a user to delete a comment
 */
export default function DeleteComment({
  currentUser,
  retreieveIdea,
  comment,
  commentState,
  toggleDeleteDialog,
}) {
  const handleSubmitDelete = () => {
    console.log("Delete Comment with id", comment.id);
    axios
      .delete(`http://localhost:8080/content/comment/${comment.id}`, {
        auth: currentUser?.auth,
      })
      .then((commentResponse) => {
        console.log("Delete Comment response", commentResponse);
        toggleDeleteDialog();
        retreieveIdea();
      })
      .catch((error) => {
        console.log("Delete Comment error", error);
      });
  };

  return (
    <React.Fragment>
      <DeleteCommentView
        comment={comment}
        commentState={commentState}
        toggleDeleteDialog={toggleDeleteDialog}
        handleSubmitDelete={handleSubmitDelete}
      />
    </React.Fragment>
  );
}
