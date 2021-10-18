import React from "react";
import { publicAxios, authAxios } from "../../../../utils";
import SuspendUserView from "./view";

/**
 * Displays a dialog for suspension confirmation
 * Allows an admin to suspend an account
 */
export default function SuspendUser({
  currentUser,
  profileState,
  retreieveProfile,
  userInfoState,
  toggleSuspendDialog,
}) {
  const handleSubmitSuspend = () => {
    console.log(
      "Toggle Suspend Credentials with id",
      profileState?.user.credentials.id
    );
    let credentials;
    publicAxios
      .get(`/account/credentials/${profileState?.user.credentials.id}`)
      .then((credentialsResponse) => {
        console.log(
          "Retrieve Credentials for Suspend response",
          credentialsResponse
        );
        credentials = credentialsResponse.data;
        credentials.suspended = !profileState?.user.credentials.suspended >>> 0;
      })
      .catch((error) => {
        console.log("Retrieve Credentials for Suspend error", error);
      })
      .then(() => {
        authAxios
          .patch(`/account/credentials`, {
            id: credentials.id,
            username: credentials.username,
            password: credentials.password,
            email: credentials.email,
            role: credentials.role,
            suspended: credentials.suspended,
          })
          .then((credentialsResponse) => {
            console.log(
              "Toggle Suspend Credentials response",
              credentialsResponse
            );
            retreieveProfile();
            toggleSuspendDialog();
          })
          .catch((error) => {
            console.log("Toggle Suspend Credentials error", error);
          });
      });
  };

  return (
    <React.Fragment>
      <SuspendUserView
        currentUser={currentUser}
        profileState={profileState}
        userInfoState={userInfoState}
        toggleSuspendDialog={toggleSuspendDialog}
        handleSubmitSuspend={handleSubmitSuspend}
      />
    </React.Fragment>
  );
}
