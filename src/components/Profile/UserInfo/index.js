import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInfoView from './view';
import EditUserInfo from './EditUserInfo'
import DeleteUser from './DeleteUser'

export default function UserInfo({ userId, isUsersProfile, setCurrentUser }) {
  const [state, setState] = useState({
    user: {
      id: -1,
      firstName: '',
      lastName: '',
      occupation: '',
      state: '',
      age: '',
      bio: ''
    },
    editUser: {
      id: -1,
      firstName: '',
      lastName: '',
      occupation: '',
      state: '',
      age: '',
      bio: ''
    },
    isEditDialogOpen: false,
    message: '',
    isDeleteDialogOpen: false
  });

  useEffect(() => {
    console.log('Retrieve User with id', userId)
    axios.get(`http://localhost:8080/account/user/${userId}`)
      .then((userResponse) => {
        console.log('Retrieve User response', userResponse)
        if (userResponse?.data === '') {
          console.log('User not found');
          return;
        }
        setState(state => ({
          ...state,
          user: userResponse.data
        }));
      }).catch(error => {
        console.log('Retrieve User error', error);
      });
  }, [userId]);

  const handleRetrieveUser = () => {
    console.log('Retrieve User with id', userId)
    axios.get(`http://localhost:8080/account/user/${userId}`)
      .then((userResponse) => {
        console.log('Retrieve User response', userResponse)
        if (userResponse?.data === '') {
          console.log('User not found');
          return;
        }
        setState(state => ({
          ...state,
          user: userResponse.data
        }));
      }).catch(error => {
        console.log('Retrieve User error', error);
      });
  }

  const handleChange = (object, prop) => (event) => {
    setState(state => ({
      ...state,
      [object]: {
        ...state?.[object],
        [prop]: event.target.value
      }
    }));
  }

  const handleToggleEditDialog = () => {
    setState(state => ({
      ...state,
      editUser: state.user,
      message: '',
      isEditDialogOpen: !state.isEditDialogOpen,
    }));
  }

  const handleToggleDeleteDialog = () => {
    setState(state => ({
      ...state,
      isDeleteDialogOpen: !state.isDeleteDialogOpen
    }));
  }

  return (
    <React.Fragment>
      <UserInfoView
        isUsersProfile={isUsersProfile}
        state={state}
        handleChange={handleChange}
        handleToggleEditDialog={handleToggleEditDialog}
        handleToggleDeleteDialog={handleToggleDeleteDialog}
      />
      <EditUserInfo
        isUsersProfile={isUsersProfile}
        state={state}
        setState={setState}
        handleChange={handleChange}
        handleRetrieveUser={handleRetrieveUser}
        handleToggleEditDialog={handleToggleEditDialog}
      />
      <DeleteUser
        isUsersProfile={isUsersProfile}
        state={state}
        setState={setState}
        setCurrentUser={setCurrentUser}
        handleToggleDeleteDialog={handleToggleDeleteDialog}
      />
    </React.Fragment>
  );
}