import React from "react";
import SearchSelectToolbarView from "./view";
import history from "../../../utils/history";

/**
 * Allows a user to navigate to the search result's page
 */
export default function SearchSelectToolbar({ selectedResult }) {
  const handleNavigateToItem = () => {
    if (selectedResult.type === "Idea") {
      history.push(`/idea/${selectedResult.id}`);
    } else if (selectedResult.type === "Topic") {
      history.push(`/topic/${selectedResult.id}`);
    } else if (selectedResult.type === "User") {
      history.push(`/profile/${selectedResult.id}`);
    }
  };

  return (
    <React.Fragment>
      <SearchSelectToolbarView handleNavigateToItem={handleNavigateToItem} />
    </React.Fragment>
  );
}
