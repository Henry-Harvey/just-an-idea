import React, { useState } from "react";
import CommentView from "./view";

/**
 * Displays a single comment's information, such as content, author, and timestamp'
 */
export default function Comment({ currentUser, retreieveIdea, comment }) {
  const [commentState, setCommentState] = useState({
    isDeleteDialogOpen: false,
  });

  let isUsersComment = false;

  if (currentUser) {
    if (comment.user.id === currentUser?.user_id) {
      isUsersComment = true;
    }
  }

  const toggleDeleteDialog = () => {
    setCommentState((state) => ({
      ...state,
      isDeleteDialogOpen: !state.isDeleteDialogOpen,
    }));
  };

  return (
    <React.Fragment>
      <CommentView
        currentUser={currentUser}
        retreieveIdea={retreieveIdea}
        comment={comment}
        commentState={commentState}
        isUsersComment={isUsersComment}
        toggleDeleteDialog={toggleDeleteDialog}
      />
    </React.Fragment>
  );
}
