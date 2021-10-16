import React from "react";
import { authAxios } from "../../../utils";
import UpvoteView from "./view";

/**
 * Allows a user to upvote the idea
 */
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
      authAxios
        .delete(`/content/upvote/${currentUser?.user_id}/${ideaState.idea.id}`)
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
      authAxios
        .post(`/content/upvote`, {
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
