import React from "react";
import { Route, Redirect } from "react-router-dom";
import { IsLoggedIn } from "../../../utils";

/**
 * Contains the route for when a user is logged in
 * Redirects to the login page if not logged in
 */
export default function PrivateRoute({ component: Component, ...rest }) {
  return (
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
