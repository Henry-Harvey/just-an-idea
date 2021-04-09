import React from 'react';
import NavBox from './NavBox'
import Pins from './Pins'

export default function SidePanel({ currentUser }) {

  return (
    <React.Fragment>
      <NavBox
        currentUser={currentUser}
      />
      <Pins />
    </React.Fragment>
  );
}