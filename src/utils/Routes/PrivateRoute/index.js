import React from "react";
import { Route, Redirect } from "react-router-dom";
import { IsLoggedIn } from "../../../utils";

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        !IsLoggedIn() ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} {...rest} />
        )
      }
    />
  );
}
