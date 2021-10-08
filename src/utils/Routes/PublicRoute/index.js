import React from "react";
import { Route, Redirect } from "react-router-dom";
import { IsLoggedIn } from "../..";

/**
 * Contains the route that is accessible for all users
 * Contains resitricted routes that cannot be accessed by logged in users, will redirect them to logout
 */
export default function PublicRoute({
  component: Component,
  restricted,
  ...rest
}) {
  return (
    // restricted = false means public route
    // restricted = true means restricted route (hiding login from logged in user)
    <Route
      {...rest}
      render={(props) =>
        IsLoggedIn() && restricted ? (
          <Redirect to="/logout" />
        ) : (
          <Component {...props} {...rest} />
        )
      }
    />
  );
}
