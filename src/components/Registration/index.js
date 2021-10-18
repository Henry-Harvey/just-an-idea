import React, { useState } from "react";
import { publicAxios } from "../../utils";
import history from "../../utils/history";
import BadWordsFilter from "bad-words";
import RegistrationView from "./view";

/**
 * Displays a form for registering
 * Allows a user to register
 */
export default function Registration() {
  const [registrationState, setRegistrationState] = useState({
    credentials: {
      username: "",
      password: "",
      email: "",
      user: {
        first_name: "",
        last_name: "",
        occupation: "",
        state: "",
        age: "",
        bio: "",
      },
    },
    hidePassword: true,
    message: "",
  });

  const toggleHidePassword = () => {
    setRegistrationState((state) => ({
      ...state,
      hidePassword: !state?.hidePassword,
    }));
  };

  const handleChange = (object, prop) => (event) => {
    if (/[a-zA-Z]/.test(event.target.value)) {
      event.target.value = new BadWordsFilter().clean(event.target.value);
    }

    setRegistrationState((state) => ({
      ...state,
      [object]: {
        ...state?.[object],
        [prop]: event.target.value,
      },
    }));
  };

  const handleChangeNested = (parent, child, prop) => (event) => {
    if (/[a-zA-Z]/.test(event.target.value)) {
      event.target.value = new BadWordsFilter().clean(event.target.value);
    }

    setRegistrationState((state) => ({
      ...state,
      [parent]: {
        ...state?.[parent],
        [child]: {
          ...state?.[parent][child],
          [prop]: event.target.value,
        },
      },
    }));
  };

  const handleSelectState = (stateAbbreviation) => {
    setRegistrationState((state) => ({
      ...state,
      credentials: {
        ...state?.credentials,
        user: {
          ...state?.credentials.user,
          state: stateAbbreviation,
        },
      },
    }));
  };

  const handleKeyPress = () => (event) => {
    if (event?.charCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    console.log(
      "Register Credentials with User",
      registrationState?.credentials
    );
    publicAxios
      .post(`/account/register`, registrationState?.credentials)
      .then((credentialsResponse) => {
        console.log("Register response", credentialsResponse);
        if (credentialsResponse?.data === "") {
          console.log("Account not registered");
          setRegistrationState((state) => ({
            ...state,
            message: "Account not registered",
          }));
          return;
        }
        history.push(`/login`);
      })
      .catch((error) => {
        console.log("Register error", error);
        setRegistrationState((state) => ({
          ...state,
          message: error.message,
        }));
      });
  };

  return (
    <RegistrationView
      registrationState={registrationState}
      toggleHidePassword={toggleHidePassword}
      handleChange={handleChange}
      handleChangeNested={handleChangeNested}
      handleKeyPress={handleKeyPress}
      handleSelectState={handleSelectState}
      handleSubmit={handleSubmit}
    />
  );
}
