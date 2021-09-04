import React from "react";
import axios from "axios";
import UpvoteView from "./view";

export default function Upvote({
  currentUser,
  ideaState,
  updateUpvotes,
  retreieveIdea,
}) {
  const toggleUpvote = () => {
    if (ideaState.isUpvoted) {
      console.log(
        "Delete Upvote with user_id & idea_id",
        currentUser?.user_id,
        ideaState.idea.id
      );
      axios
        .delete(
          `http://localhost:8080/content/upvote/${currentUser?.user_id}/${ideaState.idea.id}`
        )
        .then((upvoteResponse) => {
          console.log("Delete Upvote response", upvoteResponse);
          retreieveIdea();
        })
        .catch((error) => {
          console.log("Delete Upvote error", error);
        });
    } else {
      console.log(
        "Create Upvote with users_id & ideas_id",
        currentUser?.user_id,
        ideaState.idea.id
      );
      axios
        .post(`http://localhost:8080/content/upvote`, {
          upvote_id: {
            user_id: currentUser?.user_id,
            idea_id: ideaState.idea.id,
          },
        })
        .then((upvoteResponse) => {
          console.log("Create Upvote response", upvoteResponse);
          retreieveIdea();
        })
        .catch((error) => {
          console.log("Create Upvote error", error);
        });
    }
  };

  return (
    <React.Fragment>
      <UpvoteView ideaState={ideaState} toggleUpvote={toggleUpvote} />
    </React.Fragment>
  );
}
