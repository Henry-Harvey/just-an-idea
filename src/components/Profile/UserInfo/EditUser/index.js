import React from "react";
import axios from "axios";
import EditUserView from "./view";

export default function EditUser({
  profileState,
  userInfoState,
  isUsersProfile,
  updateUser,
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
    axios
      .patch(`http://localhost:8080/account/user`, userInfoState?.editUser)
      .then((userResponse) => {
        console.log("Edit User response", userResponse);
        updateUser(userInfoState?.editUser);
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
