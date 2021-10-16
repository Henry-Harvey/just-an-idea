import React from "react";
import { authAxios } from "../../../../utils";
import EditUserView from "./view";

/**
 * Displays a dialog for editing their account info
 * Allows a user to edit the account info
 */
export default function EditUser({
  currentUser,
  profileState,
  userInfoState,
  isUsersProfile,
  retreieveProfile,
  toggleEditDialog,
  handleChange,
  handleSelectState,
  handleEditErrorMessage,
}) {
  const handleSubmitEdit = () => {
    console.log("Edit with User", userInfoState?.editUser);
    if (userInfoState?.editUser.display_name === "") {
      handleEditErrorMessage();
      return;
    }
    authAxios
      .patch(`/account/user`, userInfoState?.editUser)
      .then((userResponse) => {
        console.log("Edit User response", userResponse);
        retreieveProfile();
        toggleEditDialog();
      })
      .catch((error) => {
        console.log("Edit User error", error);
        handleEditErrorMessage();
      });
  };

  return (
    <React.Fragment>
      <EditUserView
        userInfoState={userInfoState}
        isUsersProfile={isUsersProfile}
        toggleEditDialog={toggleEditDialog}
        handleChange={handleChange}
        handleSelectState={handleSelectState}
        handleSubmitEdit={handleSubmitEdit}
      />
    </React.Fragment>
  );
}
