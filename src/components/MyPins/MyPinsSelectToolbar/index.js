import React, { useState } from "react";
import MyPinsSelectToolbarView from "./view";

/**
 * Allows a user to navigate to a pinned topic
 * Allows a user to open the delete dialog for a pin
 */
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
