import React, { useState, useEffect } from "react";
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

  let id = parseInt(useParams().userId);
  let isUsersProfile = false;

  if (currentUser) {
    if (isNaN(id) || id === currentUser?.user_id) {
      id = currentUser?.user_id;
      isUsersProfile = true;
    }
  }

  useEffect(() => {
    if (typeof id !== "number") {
      return;
    }
    console.log("Retrieve User with id", id);
    axios
      .get(`http://localhost:8080/account/user/${id}`)
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
  }, [id]);

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
        updateUser={updateUser}
      />
    </React.Fragment>
  );
}
