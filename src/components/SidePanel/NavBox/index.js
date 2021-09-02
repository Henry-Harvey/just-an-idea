import React from "react";
import NavBoxView from "./view";

export default function NavBox({ currentUser }) {
  return (
    <React.Fragment>
      <NavBoxView currentUser={currentUser} />
    </React.Fragment>
  );
}
