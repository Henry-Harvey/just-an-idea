import React, { useState } from "react";
import axios from "axios";
import history from "../../utils/history";
import RegistrationView from "./view";

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

  const handleToggleHidePassword = () => {
    setRegistrationState((state) => ({
      ...state,
      hidePassword: !state?.hidePassword,
    }));
  };

  const handleChange = (object, prop) => (event) => {
    setRegistrationState((state) => ({
      ...state,
      [object]: {
        ...state?.[object],
        [prop]: event.target.value,
      },
    }));
  };

  const handleChangeNested = (parent, child, prop) => (event) => {
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
      user: {
        ...state?.user,
        state: stateAbbreviation,
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
    axios
      .post(
        `http://localhost:8080/account/register`,
        registrationState?.credentials
      )
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
      });
  };

  return (
    <RegistrationView
      registrationState={registrationState}
      handleToggleHidePassword={handleToggleHidePassword}
      handleChange={handleChange}
      handleChangeNested={handleChangeNested}
      handleKeyPress={handleKeyPress}
      handleSelectState={handleSelectState}
      handleSubmit={handleSubmit}
    />
  );
}
