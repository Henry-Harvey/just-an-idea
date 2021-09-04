import React, { useState } from "react";
import CommentsView from "./view";

export default function Comments({ currentUser, ideaState, retreieveIdea }) {
  const [commentsState, setCommentsState] = useState({
    displayPostComment: false,
  });

  const togglePostComment = () => {
    setCommentsState((state) => ({
      ...state,
      displayPostComment: !commentsState.displayPostComment,
    }));
  };

  return (
    <React.Fragment>
      <CommentsView
        currentUser={currentUser}
        ideaState={ideaState}
        retreieveIdea={retreieveIdea}
        commentsState={commentsState}
        togglePostComment={togglePostComment}
      />
    </React.Fragment>
  );
}
