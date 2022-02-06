import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import defaultMan from "../../../assets/images/default-man.png";
import defaultWoman from "../../../assets/images/default-woman.png";
import incognito from "../../../assets/images/incognito-avatar.png";
import "./style.scss";

const MessageStatus = ({ className, status, user }) => {
  let eltClassName = "msg-status";
  if (className) eltClassName += ` ${className}`;
  if (status) eltClassName += ` ${status}`;

  // The URL of the avatar image
  let photoURL;
  if (status === "read")
    photoURL = user.hidden
      ? incognito
      : user.photoURL
      ? user.photoURL
      : user.gender === "M"
      ? defaultMan
      : defaultWoman;

  return (
    <span
      className={eltClassName}
      style={{ backgroundImage: status === "read" ? `url(${photoURL})` : "none" }}
    >
      <FontAwesomeIcon icon="check" />
    </span>
  );
};

MessageStatus.defaultProps = {
  user: {
    photoURL: null,
    hidden: 0,
    gender: "F",
  },
};

export default MessageStatus;
