import React, { useState } from "react";
import { publicAxios } from "../../utils";
import history from "../../utils/history";
import { LogIn } from "../../utils";
import LoginView from "./view";
import querystring from "query-string";

/**
 * Displays a form for logging in
 * Allows a user to log in to the app
 */
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
    console.log("Login Authentication Credentials", loginState?.credentials);
    publicAxios
      .post(
        `/account/authenticate`,
        querystring.stringify(loginState?.credentials)
      )
      .then((authenticationResponse) => {
        console.log("Login Authentication response", authenticationResponse);
        if (authenticationResponse?.data === "") {
          console.log("Authentication was unsuccessful");
          setLoginState((state) => ({
            ...state,
            message: "Authentication was unsuccessful",
          }));
          return;
        }
        const tokens = {
          access_token: authenticationResponse?.data.access_token,
          refresh_token: authenticationResponse?.data.refresh_token,
        };
        publicAxios
          .post(`/account/login`, loginState?.credentials)
          .then((credentialsResponse) => {
            console.log("Login Credentials response", credentialsResponse);
            if (credentialsResponse?.data === "") {
              console.log("Credentials not found");
              setLoginState((state) => ({
                ...state,
                message: "Credentials not found",
              }));
              return;
            }
            if (credentialsResponse?.data.suspended !== 0) {
              console.log("Credentials have been suspended");
              setLoginState((state) => ({
                ...state,
                message: "Credentials have been suspended",
              }));
              return;
            }
            const currentUser = {
              user_id: credentialsResponse?.data.user.id,
              role: credentialsResponse?.data.role,
            };
            setCurrentUser(currentUser);
            console.log("Setting Current User", currentUser);
            const storedUser = {
              user_id: credentialsResponse?.data.user.id,
              role: credentialsResponse?.data.role,
              tokens,
            };
            LogIn(storedUser);
            history.push("/home");
          })
          .catch((error) => {
            console.log("Log in error", error);
            setLoginState((state) => ({
              ...state,
              message: error.message,
            }));
          });
      })
      .catch((error) => {
        console.log("Authentication error", error);
        setLoginState((state) => ({
          ...state,
          message: error.message,
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
