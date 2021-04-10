import React from 'react';
import ProfileView from './view';

export default function Profile({ currentUser }) {

  return (
    <React.Fragment>
      <ProfileView
        currentUser={currentUser}
      />
    </React.Fragment>
  );
}