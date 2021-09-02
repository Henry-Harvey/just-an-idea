import React from 'react';
// import axios from 'axios';
// import { LogOut } from '../../../../utils'
// import history from '../../../../utils/history'
import DeleteUserView from './view';

export default function DeleteUser({
  profileState,
  userInfoState,
  setCurrentUser,
  isUsersProfile,
  handleToggleDeleteDialog
}) {
  const handleSubmitDelete = () => {
    console.log('Delete User with id', profileState?.user.id)
    // axios.delete(`http://localhost:8080/account/user/${state?.user.id}`)
    //   .then((userResponse) => {
    //     console.log('Delete response', userResponse)
    //     handleToggleDeleteDialog();
    //     LogOut();
    //     setCurrentUser(null);
    //     history.push(`/login`)
    //   }).catch(error => {
    //     console.log('Delete User error', error);
    //   });
  }

  return (
    <React.Fragment>
      <DeleteUserView
        userInfoState={userInfoState}
        isUsersProfile={isUsersProfile}
        handleToggleDeleteDialog={handleToggleDeleteDialog}
        handleSubmitDelete={handleSubmitDelete}
      />
    </React.Fragment>
  );
}