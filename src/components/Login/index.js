import React, { useState } from "react";
import axios from "axios";
import history from "../../utils/history";
import { LogIn } from "../../utils";
import LoginView from "./view";

export default function Login({ setCurrentUser }) {
  const [loginState, setLoginState] = useState({
    credentials: {
      username: "",
      password: "",
    },
    hidePassword: true,
    message: "",
  });

  const toggleHidePassword = () => {
    setLoginState((state) => ({
      ...state,
      hidePassword: !state?.hidePassword,
    }));
  };

  const handleChange = (object, prop) => (event) => {
    setLoginState((state) => ({
      ...state,
      [object]: {
        ...state?.[object],
        [prop]: event.target.value,
      },
    }));
  };

  const handleKeyPress = () => (event) => {
    if (event?.charCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    console.log("Retrieve Credentials", loginState?.credentials);
    axios
      .post(
        `http://localhost:8080/account/credentials`,
        loginState?.credentials
      )
      .then((credentialsResponse) => {
        console.log("Retrieve Credentials response", credentialsResponse);
        if (credentialsResponse?.data === "") {
          console.log("Credentials not found");
          setLoginState((state) => ({
            ...state,
            message: "Credentials not found",
          }));
          return;
        }
        if (credentialsResponse?.data[0].suspended !== 0) {
          console.log("Credentials have been suspended");
          setLoginState((state) => ({
            ...state,
            message: "Credentials have been suspended",
          }));
          return;
        }
        const currentUser = {
          user_id: credentialsResponse?.data[0].user.id,
          role: credentialsResponse?.data[0].role,
        };
        setCurrentUser(currentUser);
        LogIn(currentUser);
        history.push(`/home`);
      })
      .catch((error) => {
        console.log("Log in error", error);
        setLoginState((state) => ({
          ...state,
          message: "Log in error",
        }));
      });
  };

  return (
    <LoginView
      loginState={loginState}
      toggleHidePassword={toggleHidePassword}
      handleChange={handleChange}
      handleKeyPress={handleKeyPress}
      handleSubmit={handleSubmit}
    />
  );
}
