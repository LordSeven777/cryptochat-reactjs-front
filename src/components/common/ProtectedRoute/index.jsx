import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import authUserContext from "../../../contexts/authUser-context.js";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authUser } = useContext(authUserContext);
  return (
    <Route
      {...rest}
      render={({ location, ...others }) =>
        authUser ? (
          <Component location={location} {...others} />
        ) : (
          <Redirect
            to={{
              pathname: "/landing/auth/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
