import React from "react";
import getUsername from "../../../../helpers/username.js";

import UserAvatar from "../../../common/UserAvatar";
import MessageStatus from "../../../common/MessageStatus";
import MessageViewers from "../MessageViewers";

const MessageBlock = ({ message, authUserID, sender, order, type }) => {
  const isOwned = message.senderID === authUserID;

  let contentCN = "flex-fill d-flex flex-column";
  if (isOwned) contentCN += " owned";

  const begins = order === 1 || order === 4;
  const ends = order === 3 || order === 4;

  let textBulletCN = "py-2";
  if (begins) textBulletCN += " begin";
  if (ends) textBulletCN += " end";

  return (
    <li className="message-block w-100">
      {message.notif && <p className="my-1 message-notif">{message.content}</p>}
      {!message.notif && (
        <div className="layout d-flex flex-wrap">
          <div className="main d-flex">
            <div className="d-flex align-items-end">
              {!isOwned && [3, 4].includes(order) && (
                <UserAvatar
                  type="peer"
                  user={sender}
                  className="msg-avatar"
                  isStatic={true}
                />
              )}
            </div>
            <div className={contentCN}>
              {type === "group" && begins && (
                <small>{isOwned ? "You" : getUsername(sender, false)}</small>
              )}
              <p className={textBulletCN}>{message.content}</p>
            </div>
          </div>
          <div className="status flex-fill d-flex flex-row-reverse align-items-end">
            {message.onStatus && (
              <MessageStatus className="ml-1" status={message.status} />
            )}
            {message.viewers && <MessageViewers viewers={message.viewers} />}
          </div>
        </div>
      )}
    </li>
  );
};

export default React.memo(MessageBlock);
