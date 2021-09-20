import React, { useState, useCallback, useEffect } from "react";
import ProfileView from "./view";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Profile({ currentUser, setCurrentUser }) {
  const [profileState, setProfileState] = useState({
    user: {
      display_name: "",
      first_name: "",
      last_name: "",
      occupation: "",
      state: "",
      age: "",
      bio: "",
      ideas: [],
    },
  });

  let user_id = parseInt(useParams().userId);
  let isUsersProfile = false;

  if (currentUser) {
    if (isNaN(user_id) || user_id === currentUser?.user_id) {
      user_id = currentUser?.user_id;
      isUsersProfile = true;
    }
  }

  const retreieveProfile = useCallback(async () => {
    if (typeof user_id !== "number") {
      return;
    }
    console.log("Retrieve User with id", user_id);
    axios
      .get(`http://localhost:8080/account/user/${user_id}`)
      .then((userResponse) => {
        console.log("Retrieve User response", userResponse);
        if (userResponse.data === "") {
          console.log("User not found");
          return;
        } else {
          setProfileState((state) => ({
            ...state,
            user: userResponse.data,
          }));
        }
      })
      .catch((error) => {
        console.log("Retrieve User error", error);
      });
  }, [user_id]);

  useEffect(() => {
    retreieveProfile();
  }, [retreieveProfile]);

  const updateUser = (editUser) => {
    setProfileState((state) => ({
      ...state,
      user: editUser,
    }));
  };

  return (
    <React.Fragment>
      <ProfileView
        profileState={profileState}
        isUsersProfile={isUsersProfile}
        setCurrentUser={setCurrentUser}
        retreieveProfile={retreieveProfile}
        updateUser={updateUser}
      />
    </React.Fragment>
  );
}
