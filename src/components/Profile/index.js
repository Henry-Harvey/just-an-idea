import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LogOut } from '../../utils'
import history from '../../utils/history'
import ProfileView from './view';

export default function Profile({ currentUser, setCurrentUser }) {
  const [state, setState] = useState({
    user: {
      id: -1,
      remainingUpvotes: -1,
      firstName: '',
      lastName: '',
      email: '',
      occupation: '',
      state: '',
      age: '',
      bio: ''
    },
    editUser: {
      id: -1,
      remainingUpvotes: -1,
      firstName: '',
      lastName: '',
      email: '',
      occupation: '',
      state: '',
      age: '',
      bio: ''
    },
    openEdit: false,
    message: '',
    openDelete: false
  });

  useEffect(() => {
    console.log('Get User', currentUser)
    axios.get(`http://localhost:8080/account/user/${currentUser.user_id}`)
      .then((response) => {
        console.log('Get User response', response)
        if (response?.status !== 200) {
          alert('Error Getting User');
        }
        if (response?.data === '') {
          alert('No User Found');
        }
        else {
          setState(state => ({
            ...state,
            user: {
              id: response?.data.id,
              remainingUpvotes: response?.data.remainingUpvotes,
              firstName: response?.data.firstName,
              lastName: response?.data.lastName,
              email: response?.data.email,
              occupation: response?.data.occupation,
              state: response?.data.state,
              age: response?.data.age,
              bio: response?.data.bio
            },
          }));
        }
      });
  }, [currentUser]);

  const handleRetrieveUser = () => {
    console.log('Get User', currentUser)
    axios.get(`http://localhost:8080/account/user/${currentUser.user_id}`)
      .then((response) => {
        console.log('Get User response', response)
        if (response?.status !== 200) {
          alert('Error Getting User');
        }
        if (response?.data === '') {
          alert('No User Found');
        }
        else {
          setState(state => ({
            ...state,
            user: {
              id: response?.data.id,
              remainingUpvotes: response?.data.remainingUpvotes,
              firstName: response?.data.firstName,
              lastName: response?.data.lastName,
              email: response?.data.email,
              occupation: response?.data.occupation,
              state: response?.data.state,
              age: response?.data.age,
              bio: response?.data.bio
            },
          }));
        }
      });
  };

  const handleChange = (object, prop) => (event) => {
    setState({
      ...state,
      [object]: {
        ...state?.[object],
        [prop]: event.target.value
      }
    });
  };

  const handleOpenEdit = () => {
    setState({
      ...state,
      editUser: {
        id: state?.user.id,
        remainingUpvotes: state?.user.remainingUpvotes,
        firstName: state?.user.firstName,
        lastName: state?.user.lastName,
        email: state?.user.email,
        occupation: state?.user.occupation,
        state: state?.user.state,
        age: state?.user.age,
        bio: state?.user.bio
      },
      openEdit: true
    });
  };

  const handleCloseEdit = () => {
    setState({
      ...state,
      openEdit: false,
      message: ''
    });
  };

  const handleSubmitEdit = () => {
    console.log('Edit User', state?.editUser)
    axios.put(`http://localhost:8080/account/user`,
      state?.editUser
    ).then((response) => {
      console.log('Edit response', response)
      if (response?.status !== 200) {
        setState({ ...state, message: 'Edit error' });
      }
      else {
        handleRetrieveUser();
        handleCloseEdit();
      }
    });
  }

  const handleOpenDelete = () => {
    setState({
      ...state,
      openDelete: true
    });
  };

  const handleCloseDelete = () => {
    setState({
      ...state,
      openDelete: false
    });
  };

  const handleSubmitDelete = () => {
    console.log('Delete User', state?.user)
    axios.delete(`http://localhost:8080/account/user/${state?.user.id}`)
      .then((response) => {
        console.log('Delete response', response)
        if (response?.status !== 200) {
          //setState({ ...state, message: 'Delete error' });
        }
        else {
          handleCloseDelete();
          LogOut();
          setCurrentUser(null);
          history.push(`/login`)
        }
      });
  }

  return (
    <React.Fragment>
      <ProfileView
        state={state}
        handleChange={handleChange}
        handleOpenEdit={handleOpenEdit}
        handleCloseEdit={handleCloseEdit}
        handleSubmitEdit={handleSubmitEdit}
        handleOpenDelete={handleOpenDelete}
        handleCloseDelete={handleCloseDelete}
        handleSubmitDelete={handleSubmitDelete}
      />
    </React.Fragment>
  );
}