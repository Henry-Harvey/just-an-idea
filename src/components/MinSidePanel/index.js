import React from "react";
import MinSidePanelView from "./view";

/**
 * Allows a user to log out or navigate to Home, About, My Profile, My Upvotes, or Post if logged in
 * Allows a user to navigate to Home, About, Registration, or Login if logged out
 */
export default function MinSidePanel({ currentUser }) {
  return (
    <React.Fragment>
      <MinSidePanelView currentUser={currentUser} />
    </React.Fragment>
  );
}
