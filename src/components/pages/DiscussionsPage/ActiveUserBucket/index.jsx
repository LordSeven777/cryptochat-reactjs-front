import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";

import UserAvatar from "../../../common/UserAvatar";

const ActiveUserBucket = ({ user }) => {
  const { userID, firstName, lastName, pseudo, hidden } = user;

  return (
    <Link to={`/discussions/peer/${parseInt(userID)}`} className="user-bucket p-2 rounded-sm">
      <UserAvatar displayable={false} user={user} />
      <p className="mb-0 mt-2">
        {!hidden ? (
          `${firstName} ${lastName}`
        ) : (
          <em>
            {pseudo}
            <FontAwesomeIcon icon="pencil-alt" className="ml-1" />
          </em>
        )}
      </p>
    </Link>
  );
};

export default ActiveUserBucket;
