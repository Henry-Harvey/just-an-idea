import React, { useState } from "react";
import axios from "axios";
import TopicToolbarView from "./view";
import DeleteTopic from "./DeleteTopic";

/**
 * Allows a user to pin or unpin the topic
 */
export default function TopicToolbar({
  currentUser,
  reloadPinsRef,
  topicState,
  retreieveTopic,
}) {
  const [topicToolbarState, setTopicToolbarState] = useState({
    isDeleteDialogOpen: false,
  });

  const toggleDeleteDialog = () => {
    setTopicToolbarState((state) => ({
      ...state,
      isDeleteDialogOpen: !state.isDeleteDialogOpen,
    }));
  };

  const togglePin = () => {
    if (topicState.isPinned) {
      console.log(
        "Delete Pin with user_id & topic_id",
        currentUser?.user_id,
        topicState.topic.id
      );
      axios
        .delete(
          `http://localhost:8080/content/pin/${currentUser?.user_id}/${topicState.topic.id}`,
          { auth: currentUser?.auth }
        )
        .then((pinResponse) => {
          console.log("Delete Pin response", pinResponse);
          // window.location.reload();
          retreieveTopic();
          reloadPinsRef.current();
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
        .post(
          `http://localhost:8080/content/pin`,
          {
            pin_id: {
              user_id: currentUser?.user_id,
              topic_id: topicState.topic.id,
            },
          },
          {
            auth: currentUser?.auth,
          }
        )
        .then((pinResponse) => {
          console.log("Create Pin response", pinResponse);
          // window.location.reload();
          retreieveTopic();
          reloadPinsRef.current();
        })
        .catch((error) => {
          console.log("Create Pin error", error);
        });
    }
  };

  return (
    <React.Fragment>
      <TopicToolbarView
        currentUser={currentUser}
        topicState={topicState}
        togglePin={togglePin}
        toggleDeleteDialog={toggleDeleteDialog}
      />
      <DeleteTopic
        currentUser={currentUser}
        topicState={topicState}
        topicToolbarState={topicToolbarState}
        toggleDeleteDialog={toggleDeleteDialog}
      />
    </React.Fragment>
  );
}
