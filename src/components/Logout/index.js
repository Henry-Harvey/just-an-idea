import React, { useState } from "react";
import history from "../../utils/history";
import { LogOut } from "../../utils";
import LogoutView from "./view";

/**
 * Displays a dialog for logout confirmation
 * Allows a user to log out of the app
 */
export default function Logout({ setCurrentUser }) {
  const [dialog, setDialog] = useState(true);

  const handleClose = () => {
    setDialog(false);
    history.goBack();
  };

  const handleSubmit = () => {
    LogOut();
    setCurrentUser(null);
    history.push(`/login`);
  };

  return (
    <LogoutView
      dialog={dialog}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    />
  );
}
