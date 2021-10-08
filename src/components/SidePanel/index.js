import React from "react";
import NavBox from "./NavBox";
import Pins from "./Pins";

/**
 * Contains the navigation box and the pins components
 */
export default function SidePanel({ currentUser, reloadPinsRef }) {
  return (
    <React.Fragment>
      <NavBox currentUser={currentUser} />
      <Pins currentUser={currentUser} reloadPinsRef={reloadPinsRef} />
    </React.Fragment>
  );
}
