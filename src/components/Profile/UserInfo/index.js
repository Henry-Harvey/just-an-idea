import React, { useState } from "react";
import UserInfoView from "./view";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import SuspendUser from "./SuspendUser";
import BadWordsFilter from "bad-words";

/**
 * Displays a user's information if they have provided it, such as Display Name, First Name, Last Name, Occuptaion, State, Age, and Bio
 */
export default function UserInfo({
  currentUser,
  setCurrentUser,
  profileState,
  isUsersProfile,
  retreieveProfile,
}) {
  const [userInfoState, setUserInfoState] = useState({
    isEditDialogOpen: false,
    isDeleteDialogOpen: false,
    isSuspendDialogOpen: false,
    editUser: {},
    message: "",
  });

  const toggleEditDialog = () => {
    setUserInfoState((state) => ({
      ...state,
      isEditDialogOpen: !state.isEditDialogOpen,
      editUser: {
        id: profileState.user.id,
        display_name: profileState.user.display_name,
        first_name: profileState.user.first_name,
        last_name: profileState.user.last_name,
        occupation: profileState.user.occupation,
        state: profileState.user.state,
        age: profileState.user.age,
        bio: profileState.user.bio,
      },
      message: "",
    }));
  };

  const handleChange = (object, prop) => (event) => {
    if (/[a-zA-Z]/.test(event.target.value)) {
      event.target.value = new BadWordsFilter().clean(event.target.value);
    }

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

  const toggleSuspendDialog = () => {
    setUserInfoState((state) => ({
      ...state,
      isSuspendDialogOpen: !state.isSuspendDialogOpen,
    }));
  };

  return (
    <React.Fragment>
      <UserInfoView
        currentUser={currentUser}
        profileState={profileState}
        isUsersProfile={isUsersProfile}
        toggleEditDialog={toggleEditDialog}
        toggleDeleteDialog={toggleDeleteDialog}
        toggleSuspendDialog={toggleSuspendDialog}
      />
      <EditUser
        currentUser={currentUser}
        profileState={profileState}
        userInfoState={userInfoState}
        isUsersProfile={isUsersProfile}
        retreieveProfile={retreieveProfile}
        toggleEditDialog={toggleEditDialog}
        handleChange={handleChange}
        handleSelectState={handleSelectState}
        handleEditErrorMessage={handleEditErrorMessage}
      />
      <DeleteUser
        currentUser={currentUser}
        profileState={profileState}
        userInfoState={userInfoState}
        setCurrentUser={setCurrentUser}
        isUsersProfile={isUsersProfile}
        toggleDeleteDialog={toggleDeleteDialog}
      />
      <SuspendUser
        currentUser={currentUser}
        profileState={profileState}
        retreieveProfile={retreieveProfile}
        userInfoState={userInfoState}
        toggleSuspendDialog={toggleSuspendDialog}
      />
    </React.Fragment>
  );
}
