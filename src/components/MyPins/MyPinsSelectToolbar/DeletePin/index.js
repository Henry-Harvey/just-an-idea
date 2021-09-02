import React from "react";
import axios from "axios";
import DeletePinView from "./view";

export default function DeletePin({
  selectedPin,
  handleToggleDeleteDialog,
  myPinsSelectToolbarState,
  currentUser,
}) {
  const handleSubmitDelete = () => {
    console.log(
      "Delete Pin with user_id & topic_id",
      currentUser.user_id,
      selectedPin.topic.id
    );
    axios
      .delete(
        `http://localhost:8080/content/pin/${currentUser.user_id}/${selectedPin.topic.id}`
      )
      .then((pinResponse) => {
        console.log("Delete Pin response", pinResponse);
        handleToggleDeleteDialog();
        window.location.reload();
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
        handleToggleDeleteDialog={handleToggleDeleteDialog}
        handleSubmitDelete={handleSubmitDelete}
      />
    </React.Fragment>
  );
}
