import React, { useState, useEffect, useCallback, useMemo } from "react";
import { fetchUser } from "../../../apis/users-api.js";
import authUserContext from "../../../contexts/authUser-context";
import useIsUpdated from "../../../hooks/useIsUpdated.js";
import {
  getAuthUserCache,
  setAuthUserCache
} from "../../../helpers/authUserCache-helper.js";
import ioObject from "../../../client-io.js";
import refactorUser from "../../../helpers/refactorUser-helper.js";

const AuthUserProvider = props => {
  const [socketIsSetup, setSocketIsSetup] = useState(false);

  const [authUser, setAuthUser] = useState(getAuthUserCache());
  // {
  //   userID: 1,
  //   firstName: "John",
  //   lastName: "Doe",
  //   gender: "M",
  //   pseudo: "johnDoe23",
  //   photo: "http://localhost:5000/users/photos/1.jpg",
  //   email: "johnDoe@gmail.com",
  //   online: 1,
  //   hidden: 0
  // }

  // Sets up the socket on the server
  const setupSocket = useCallback(() => {
    ioObject.createSocketInstance().then(() => {
      setSocketIsSetup(true);
    });
    ioObject.initServerSocketSetup(refactorUser(authUser));
  }, [authUser]);

  // Sets all the auth user's data
  const setAuthUserData = useCallback(user => {
    setAuthUserCache(user);
    setAuthUser(user);
  }, []);

  // Whether the auth user's data is updated
  const [authUserIsUpdated, setAuthUserUpdated] = useIsUpdated();

  // Updates the auth user's data if is initially set
  useEffect(() => {
    if (!authUserIsUpdated && authUser)
      fetchUser(authUser.userID).then(user => {
        setAuthUserData(user);
        setAuthUserUpdated();
      });
  }, [authUser, authUserIsUpdated, setAuthUserData, setAuthUserUpdated]);

  const contextValue = useMemo(() => {
    return { socketIsSetup, authUser, setupSocket, setAuthUserData };
  }, [socketIsSetup, authUser, setupSocket, setAuthUserData]);

  return (
    <authUserContext.Provider value={contextValue}>
      {props.children}
    </authUserContext.Provider>
  );
};

export default AuthUserProvider;
