import React from 'react';
import axios from 'axios';
import EditUserView from './view';

export default function EditUser({
  profileState,
  userInfoState,
  isUsersProfile,
  updateUser,
  handleToggleEditDialog,
  handleChange,
  handleSelectState,
  handleEditErrorMessage
}) {

  const handleSubmitEdit = () => {
    console.log('Edit with User', userInfoState?.editUser)
    axios.patch(`http://localhost:8080/account/user`,
      userInfoState?.editUser
    ).then((userResponse) => {
      console.log('Edit User response', userResponse)
      updateUser(userInfoState?.editUser);
      handleToggleEditDialog();
    }).catch(error => {
      console.log('Edit User error', error);
      handleChange('message', 'first_name')
      handleEditErrorMessage();
    });
  }

  return (
    <React.Fragment>
      <EditUserView
        userInfoState={userInfoState}
        isUsersProfile={isUsersProfile}
        handleToggleEditDialog={handleToggleEditDialog}
        handleChange={handleChange}
        handleSelectState={handleSelectState}
        handleSubmitEdit={handleSubmitEdit}
      />
    </React.Fragment>
  );
}