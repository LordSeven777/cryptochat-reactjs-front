import { useState, useEffect, useCallback, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useApiCall from "./useApiCall";
import authUserContext from "../contexts/authUser-context.js";
import { loginUser } from "../apis/auth-api.js";
import { setAccessToken } from "../helpers/jwt-helper.js";
import useIsUpdated from "./useIsUpdated.js";
import Crypto from "../helpers/crypto-helper.js";

const useLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [feedbacks, setFeedbacks] = useState({
    identifier: null,
    password: null
  });

  const { authUser, setAuthUserData } = useContext(authUserContext);

  const [loading, callLoginUser] = useApiCall(loginUser, true, true);

  const history = useHistory();
  const { state: refererState } = useLocation();

  // Changes the values of the inputs
  const handleChange = useCallback(
    field => e => {
      if (field === "identifier") setIdentifier(e.target.value);
      else if (field === "password") setPassword(e.target.value);
    },
    []
  );

  // Handles the form submission
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      const data = {
        email_pseudo: identifier,
        password: password
      };
      setFeedbacks({
        identifier: null,
        password: null
      });
      callLoginUser(data)
        .then(({ accessToken, user }) => {
          setAccessToken(accessToken);
          setAuthUserData(user);
        })
        .catch(({ data: { error } }) => {
          const _feebacks = {};
          error.forEach(({ field, message }) => {
            _feebacks[
              field === "email_pseudo" ? "identifier" : "password"
            ] = message;
          });
          setFeedbacks(_feebacks);
        });
    },
    [callLoginUser, identifier, password, setAuthUserData]
  );

  //The updated state of the auth user's data
  const [isUpdated, setIsUpdated] = useIsUpdated();

  // Heads us to the discussions page after the auth user's data is set
  useEffect(() => {
    if (!isUpdated && authUser) {
      history.push(
        refererState && refererState.from ? refererState.from : "/discussions"
      );
      setIsUpdated();
    }
  }, [isUpdated, authUser, setIsUpdated, history, refererState]);

  return {
    loading,
    identifier,
    password,
    handleChange,
    feedbacks,
    handleSubmit
  };
};

export default useLogin;
