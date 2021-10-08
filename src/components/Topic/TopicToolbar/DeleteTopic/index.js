import React from "react";
import axios from "axios";
import history from "../../../../utils/history";
import DeleteTopicView from "./view";

/**
 * Displays a dialog for deletion confirmation
 * Allows an admin to delete a topic
 */
export default function DeleteTopic({
  currentUser,
  topicState,
  topicToolbarState,
  toggleDeleteDialog,
}) {
  const handleSubmitDelete = () => {
    console.log("Delete Topic with id", topicState.topic.id);
    axios
      .delete(`http://localhost:8080/content/topic/${topicState.topic.id}`, {
        auth: currentUser?.auth,
      })
      .then((topicResponse) => {
        console.log("Delete Topic response", topicResponse);
        toggleDeleteDialog();
        history.push(`/home`);
      })
      .catch((error) => {
        console.log("Delete Topic error", error);
      });
  };

  return (
    <React.Fragment>
      <DeleteTopicView
        topicState={topicState}
        topicToolbarState={topicToolbarState}
        toggleDeleteDialog={toggleDeleteDialog}
        handleSubmitDelete={handleSubmitDelete}
      />
    </React.Fragment>
  );
}
