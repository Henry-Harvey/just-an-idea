import React from 'react';
import axios from 'axios';
import EditUserInfoView from './view';

export default function EditUserInfo({ isUsersProfile, state, setState, handleChange, handleRetrieveUser, handleToggleEditDialog }) {
  const handleSelectState = (stateAbbreviation) => {
    setState(state => ({
      ...state,
      editUser: {
        ...state?.editUser,
        state: stateAbbreviation
      }
    }));
  }

  const handleSubmitEdit = () => {
    console.log('Edit with User', state?.editUser)
    axios.put(`http://localhost:8080/account/user`,
      state?.editUser
    ).then((userResponse) => {
      console.log('Edit User response', userResponse)
      handleRetrieveUser();
      handleToggleEditDialog();
    }).catch(error => {
      console.log('Edit User error', error);
      setState(state => ({
        ...state,
        message: 'Edit User error'
      }));
    });
  }

  return (
    <React.Fragment>
      <EditUserInfoView
        isUsersProfile={isUsersProfile}
        state={state}
        handleChange={handleChange}
        handleSelectState={handleSelectState}
        handleToggleEditDialog={handleToggleEditDialog}
        handleSubmitEdit={handleSubmitEdit}
      />
    </React.Fragment>
  );
}