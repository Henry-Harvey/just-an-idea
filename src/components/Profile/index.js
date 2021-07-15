import React, { useState, useEffect } from 'react';
import ProfileView from './view';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Profile({ currentUser, setCurrentUser }) {
  const [state, setState] = useState({
    title: ''
  });

  let userId = parseInt(useParams().userId);
  let isUsersProfile = false;

  if (isNaN(userId) || userId === currentUser.user_id) {
    userId = currentUser.user_id;
    isUsersProfile = true;
  }

  useEffect(() => {
    console.log('Retrieve Credentials with users_id', userId)
    axios.post(`http://localhost:8080/account/credentials`,
      {
        users_id: userId
      }
    ).then((credentialsResponse) => {
      console.log('Retrieve Credentials response', credentialsResponse)
      if (credentialsResponse?.data === '') {
        console.log('Credentials not found');
        return;
      }
      else {
        setState(state => ({
          ...state,
          title: credentialsResponse.data[0]?.username
        }));
      }
    }).catch(error => {
      console.log('Retrieve Credentials error', error);
    });
  }, [userId]);

  return (
    <React.Fragment>
      <ProfileView
        state={state}
        userId={userId}
        isUsersProfile={isUsersProfile}
        setCurrentUser={setCurrentUser}
      />
    </React.Fragment>
  );
}