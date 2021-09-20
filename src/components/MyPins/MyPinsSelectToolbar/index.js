import React, { useState } from "react";
import MyPinsSelectToolbarView from "./view";

export default function MyPinsSelectToolbar({
  currentUser,
  reloadPinsRef,
  retreieveMyPins,
  selectedPin,
}) {
  const [myPinsSelectToolbarState, setMyPinsSelectToolbarState] = useState({
    isDeleteDialogOpen: false,
  });

  const toggleDeleteDialog = () => {
    setMyPinsSelectToolbarState((state) => ({
      ...state,
      isDeleteDialogOpen: !state.isDeleteDialogOpen,
    }));
  };

  return (
    <React.Fragment>
      <MyPinsSelectToolbarView
        currentUser={currentUser}
        reloadPinsRef={reloadPinsRef}
        retreieveMyPins={retreieveMyPins}
        selectedPin={selectedPin}
        toggleDeleteDialog={toggleDeleteDialog}
        myPinsSelectToolbarState={myPinsSelectToolbarState}
      />
    </React.Fragment>
  );
}
