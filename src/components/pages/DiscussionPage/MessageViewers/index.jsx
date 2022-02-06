import React from "react";
import MessageStatus from "../../../common/MessageStatus";

const MessageViewers = ({ viewers }) => {
  return (
    <ul className="viewers list-unstyled d-flex flex-row-reverse">
      {viewers.map((v) => (
        <li key={v.userID}>
          <MessageStatus user={v} status="read" />
        </li>
      ))}
    </ul>
  );
};

export default React.memo(MessageViewers);
