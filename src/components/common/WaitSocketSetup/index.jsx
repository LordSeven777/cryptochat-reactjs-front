import React, { useEffect, useContext } from "react";
import authUserContext from "../../../contexts/authUser-context.js";
import useIsUpdated from "../../../hooks/useIsUpdated.js";
import "./style.scss";

const WaitSocketSetup = props => {
  const { socketIsSetup, setupSocket } = useContext(authUserContext);

  const [isUpdated, setUdapted] = useIsUpdated();

  useEffect(() => {
    if (!socketIsSetup && !isUpdated) {
      // console.log(socketIsSetup, isUpdated);
      setupSocket();
      setUdapted();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketIsSetup, isUpdated, setUdapted]);

  return socketIsSetup ? (
    props.children
  ) : (
    <div className="wait-socket-page">
      <p className="text-light">Please wait ...</p>
    </div>
  );
};

export default React.memo(WaitSocketSetup);
