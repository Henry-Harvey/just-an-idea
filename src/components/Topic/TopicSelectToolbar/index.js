import React from "react";
import TopicSelectToolbarView from "./view";

/**
 * Allows a user to pin or unpin the topic
 */
export default function TopicSelectToolbar({ selectedIdea }) {
  return (
    <React.Fragment>
      <TopicSelectToolbarView selectedIdea={selectedIdea} />
    </React.Fragment>
  );
}
