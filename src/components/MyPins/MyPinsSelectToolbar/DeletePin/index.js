import React from "react";
import { authAxios } from "../../../../utils";
import DeletePinView from "./view";

/**
 * Displays a dialog for deletion confirmation
 * Allows a user to delete a pin from a topic
 */
export default function DeletePin({
  currentUser,
  reloadPinsRef,
  retreieveMyPins,
  selectedPin,
  toggleDeleteDialog,
  myPinsSelectToolbarState,
}) {
  const handleSubmitDelete = () => {
    console.log(
      "Delete Pin with user_id & topic_id",
      currentUser?.user_id,
      selectedPin.topic.id
    );
    authAxios
      .delete(`/content/pin/${currentUser?.user_id}/${selectedPin.topic.id}`)
      .then((pinResponse) => {
        console.log("Delete Pin response", pinResponse);
        toggleDeleteDialog();
        retreieveMyPins();
        reloadPinsRef.current();
      })
      .catch((error) => {
        console.log("Delete Pin error", error);
      });
  };

  return (
    <React.Fragment>
      <DeletePinView
        selectedPin={selectedPin}
        myPinsSelectToolbarState={myPinsSelectToolbarState}
        toggleDeleteDialog={toggleDeleteDialog}
        handleSubmitDelete={handleSubmitDelete}
      />
    </React.Fragment>
  );
}
