import React from "react";
import axios from "axios";
import { LogOut } from "../../../../utils";
import history from "../../../../utils/history";
import DeleteUserView from "./view";

/**
 * Displays a dialog for deletion confirmation
 * Allows a user to delete their account
 */
export default function DeleteUser({
  currentUser,
  profileState,
  userInfoState,
  setCurrentUser,
  isUsersProfile,
  toggleDeleteDialog,
}) {
  const handleSubmitDelete = () => {
    console.log("Delete User with id", profileState?.user.id);
    axios
      .delete(`http://localhost:8080/account/user/${profileState?.user.id}`, {
        auth: currentUser?.auth,
      })
      .then((userResponse) => {
        console.log("Delete response", userResponse);
        toggleDeleteDialog();
        LogOut();
        setCurrentUser(null);
        history.push(`/login`);
      })
      .catch((error) => {
        console.log("Delete User error", error);
      });
  };

  return (
    <React.Fragment>
      <DeleteUserView
        userInfoState={userInfoState}
        isUsersProfile={isUsersProfile}
        toggleDeleteDialog={toggleDeleteDialog}
        handleSubmitDelete={handleSubmitDelete}
      />
    </React.Fragment>
  );
}
