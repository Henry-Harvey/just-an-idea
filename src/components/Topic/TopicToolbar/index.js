import React from "react";
import axios from "axios";
import TopicToolbarView from "./view";

export default function TopicToolbar({ currentUser, topicState }) {
  const togglePin = () => {
    if (topicState.isPinned) {
      console.log(
        "Delete Pin with user_id & topic_id",
        currentUser?.user_id,
        topicState.topic.id
      );
      axios
        .delete(
          `http://localhost:8080/content/pin/${currentUser?.user_id}/${topicState.topic.id}`
        )
        .then((pinResponse) => {
          console.log("Delete Pin response", pinResponse);
          window.location.reload();
        })
        .catch((error) => {
          console.log("Delete Pin error", error);
        });
    } else {
      console.log(
        "Create Pin with user_id & topic_id",
        currentUser?.user_id,
        topicState.topic.id
      );
      axios
        .post(`http://localhost:8080/content/pin`, {
          pin_id: {
            user_id: currentUser?.user_id,
            topic_id: topicState.topic.id,
          },
        })
        .then((pinResponse) => {
          console.log("Create Pin response", pinResponse);
          window.location.reload();
        })
        .catch((error) => {
          console.log("Create Pin error", error);
        });
    }
  };

  return (
    <React.Fragment>
      <TopicToolbarView topicState={topicState} togglePin={togglePin} />
    </React.Fragment>
  );
}
