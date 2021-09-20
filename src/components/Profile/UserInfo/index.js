import React, { useState } from "react";
import UserInfoView from "./view";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

export default function UserInfo({
  profileState,
  isUsersProfile,
  setCurrentUser,
  updateUser,
}) {
  const [userInfoState, setUserInfoState] = useState({
    isEditDialogOpen: false,
    isDeleteDialogOpen: false,
    editUser: {},
    message: "",
  });

  const toggleEditDialog = () => {
    setUserInfoState((state) => ({
      ...state,
      isEditDialogOpen: !state.isEditDialogOpen,
      editUser: profileState.user,
      message: "",
    }));
  };

  const handleChange = (object, prop) => (event) => {
    setUserInfoState((state) => ({
      ...state,
      [object]: {
        ...state?.[object],
        [prop]: event.target.value,
      },
    }));
  };

  const handleSelectState = (stateAbbreviation) => {
    setUserInfoState((state) => ({
      ...state,
      editUser: {
        ...state?.editUser,
        state: stateAbbreviation,
      },
    }));
  };

  const handleEditErrorMessage = () => {
    setUserInfoState((state) => ({
      ...state,
      message: "Edit User error",
    }));
  };

  const toggleDeleteDialog = () => {
    setUserInfoState((state) => ({
      ...state,
      isDeleteDialogOpen: !state.isDeleteDialogOpen,
    }));
  };

  return (
    <React.Fragment>
      <UserInfoView
        profileState={profileState}
        isUsersProfile={isUsersProfile}
        toggleEditDialog={toggleEditDialog}
        toggleDeleteDialog={toggleDeleteDialog}
      />
      <EditUser
        profileState={profileState}
        userInfoState={userInfoState}
        isUsersProfile={isUsersProfile}
        updateUser={updateUser}
        toggleEditDialog={toggleEditDialog}
        handleChange={handleChange}
        handleSelectState={handleSelectState}
        handleEditErrorMessage={handleEditErrorMessage}
      />
      <DeleteUser
        profileState={profileState}
        userInfoState={userInfoState}
        setCurrentUser={setCurrentUser}
        isUsersProfile={isUsersProfile}
        toggleDeleteDialog={toggleDeleteDialog}
      />
    </React.Fragment>
  );
}
