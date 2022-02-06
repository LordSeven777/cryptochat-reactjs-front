import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Username = ({ user, className }) => {
  return !user.hidden ? (
    `${user.firstName} ${user.lastName}`
  ) : (
    <i className={className}>
      {user.pseudo} <FontAwesomeIcon icon="pencil-alt" className="ml-1" />
    </i>
  );
};

export default Username;
