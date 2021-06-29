import React from 'react';
import ProfileView from './view';

export default function Profile({ currentUser, setCurrentUser }) {
  
  return (
    <React.Fragment>
      <ProfileView
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </React.Fragment>
  );
}