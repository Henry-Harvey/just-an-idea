import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { publicAxios } from "../../utils";
import ProfileView from "./view";

/**
 * Contains the user's info and the user's ideas components
 */
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
      credentials: {
        suspended: 0,
      },
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
      setProfileState((state) => ({
        ...state,
        user: {
          ...state.user,
          id: -1,
        },
      }));
      return;
    }
    console.log("Retrieve User with id", user_id);
    publicAxios
      .get(`/account/user/${user_id}`)
      .then((userResponse) => {
        console.log("Retrieve User response", userResponse);
        if (userResponse.data === "") {
          console.log("User not found");
          setProfileState((state) => ({
            ...state,
            user: {
              ...state.user,
              id: -1,
            },
          }));
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

  return (
    <React.Fragment>
      <ProfileView
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        profileState={profileState}
        isUsersProfile={isUsersProfile}
        retreieveProfile={retreieveProfile}
      />
    </React.Fragment>
  );
}
