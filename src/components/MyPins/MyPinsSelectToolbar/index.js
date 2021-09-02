import React, { useState } from 'react';
import MyPinsSelectToolbarView from './view';
import DeletePin from './DeletePin'

export default function MyPinsSelectToolbar({
  selectedPin,
  currentUser
}) {
  const [myPinsSelectToolbarState, setMyPinsSelectToolbarState] = useState({
    isDeleteDialogOpen: false
  });

  const handleToggleDeleteDialog = () => {
    setMyPinsSelectToolbarState(state => ({
      ...state,
      isDeleteDialogOpen: !state.isDeleteDialogOpen
    }));
  };

  return (
    <React.Fragment>
      < MyPinsSelectToolbarView
        selectedPin={selectedPin}
        handleToggleDeleteDialog={handleToggleDeleteDialog}
      />
      <DeletePin
        selectedPin={selectedPin}
        handleToggleDeleteDialog={handleToggleDeleteDialog}
        myPinsSelectToolbarState={myPinsSelectToolbarState}
        currentUser={currentUser}
      />
    </React.Fragment>
  );
}