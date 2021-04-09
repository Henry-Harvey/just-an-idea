import React from "react";
import { Route, Redirect } from "react-router-dom";
import { IsLoggedIn } from "../../../utils";

export default function PublicRoute({ component: Component, restricted, ...rest }) {
    return (
        // restricted = false means public route
        // restricted = true means restricted route (hiding login from logged in user)
        <Route
            {...rest}
            render={(props) => (
                IsLoggedIn() && restricted ?
                    <Redirect to="/home" />
                    :
                    <Component
                        {...props}
                        {...rest}
                    />
            )
            }
        />
    );
};
