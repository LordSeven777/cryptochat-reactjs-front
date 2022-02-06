import React, { useState, useEffect, useMemo, useContext } from "react";
import authUserContext from "../../../../contexts/authUser-context.js";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getUsername from "../../../../helpers/username";
import pluralize from "../../../../helpers/pluralize";
import { displayFromNow } from "../../../../helpers/moments.helper";
import {
  peerNotification,
  groupNofitication
} from "../../../../helpers/disNotif-helper";
import "./style.scss";

import Username from "../../../common/Username";
import UserAvatar from "../../../common/UserAvatar";
import MessageStatus from "../../../common/MessageStatus";

const DiscussionBullet = ({ discussion, authUserID, location, openDPage }) => {
  const {
    type,
    discussionID,
    user,
    group,
    status,
    messages,
    members
  } = discussion;
  const [lastMessage] = messages;

  const thereIsNotif = useMemo(() => {
    if (!lastMessage) return true;
    else if (type === "peer" && lastMessage.date < status.date) return true;
    else if (
      type === "group" &&
      lastMessage.date <= members[members.length - 1].statusDate
    )
      return true;
    else return false;
  }, [type, lastMessage, members, status]);

  const message = useMemo(() => {
    if (!status) return null;
    if (thereIsNotif) {
      const { message, date } =
        type === "peer"
          ? peerNotification(status, user)
          : members.every(
              member =>
                member.status === "admin" &&
                member.statusDate === group.creationDate
            )
          ? groupNofitication(group, null, null, true)
          : groupNofitication(group, members[members.length - 1], authUserID);
      return { content: message, date };
    } else return { content: lastMessage.content, date: lastMessage.date };
  }, [
    thereIsNotif,
    lastMessage,
    type,
    status,
    user,
    group,
    members,
    authUserID
  ]);

  const [fromNow, setFromNow] = useState(
    !message ? null : displayFromNow(message.date).output
  );

  // Updating the from now time
  useEffect(() => {
    if (message) {
      const { output, updateOn } = displayFromNow(message.date);
      const updater = () => setFromNow(output);
      setTimeout(updater, updateOn);
      return () => clearTimeout(updater);
    }
  }, [message, fromNow]);

  // Global data
  const currentUser = useContext(authUserContext).authUser;

  // Tells whether the message was sent by the current user
  const isFromCurrentUser = useMemo(() => {
    if (!lastMessage) return false;
    return parseInt(currentUser.userID) === parseInt(lastMessage.senderID);
  }, [lastMessage, currentUser.userID]);

  // Sender's name
  const senderName = useMemo(() => {
    if (!lastMessage) return null;
    return isFromCurrentUser
      ? "You"
      : type === "peer"
      ? getUsername(user, false)
      : getUsername(
          members.find(
            ({ userID }) => parseInt(userID) === parseInt(lastMessage.senderID)
          ),
          false
        );
  }, [type, isFromCurrentUser, user, members, lastMessage]);

  // Whether the message is not from the current user and is not read
  const isNotRead =
    (lastMessage && !isFromCurrentUser && lastMessage.status !== "read") ||
    (message && thereIsNotif && !status.isSeen);

  let contentClassName = "content";
  if (isNotRead) contentClassName += " unread";

  return (
    <NavLink
      to={`/discussions/${type}/${discussionID}?location=${location}`}
      exact
      activeClassName="active"
      className="discussion-bullet p-1"
      onClick={() => openDPage(true)}
    >
      <UserAvatar
        className="d-b-avatar"
        displayable={false}
        type={type}
        user={user}
        group={group}
        members={members}
      />
      <div className="user-info">
        <strong className="username">
          {type === "peer" ? <Username user={user} /> : group.name}
        </strong>
        {message && (
          <div className="message">
            <div className={contentClassName}>
              {thereIsNotif && message.content}
              {!thereIsNotif && (
                <>
                  {lastMessage.nature === "image" && !lastMessage.content
                    ? `${senderName} sent ${
                        lastMessage.images.length
                      } ${pluralize("photo", lastMessage.images.length > 1)}`
                    : `${senderName}: ${lastMessage.content}`}
                </>
              )}
            </div>
            {message && <div className="time">· {fromNow}</div>}
          </div>
        )}
      </div>
      {message && (
        <div className="status">
          {!thereIsNotif &&
            isFromCurrentUser &&
            (type !== "group" || lastMessage.status !== "read") && (
              <MessageStatus status={lastMessage.status} user={user} />
            )}
          {isNotRead && <FontAwesomeIcon icon="circle" className="unread" />}
        </div>
      )}
    </NavLink>
  );
};

DiscussionBullet.defaultProps = {
  discussion: {
    type: "peer",
    discussionID: "00002",
    user: {
      userID: "00001",
      photoURL: "http://localhost:5000/users/photos/4.jpg",
      online: 1,
      hidden: 0,
      firstName: "Robbie",
      lastName: "Jenckins",
      gender: "F",
      lastOnlineDate: "2021-08-01 16:05:40"
    },
    messages: [
      {
        messageID: "0000000013",
        content: "hello",
        nature: "text",
        date: "2021-07-23 01:14:23",
        senderID: "0000000002",
        receiverID: "0000000004",
        status: "sent",
        discussionID: "0000000006"
      }
    ],
    // messages: [
    //   {
    //     group_message_ID: "0000000007",
    //     content: "Here are them",
    //     nature: "image",
    //     date: "2021-08-28 10:53:46",
    //     status: "sent",
    //     senderID: "0000000003",
    //     groupID: "0000000001",
    //     images: [
    //       {
    //         imageID: "0000000002",
    //         imageURL: "http://localhost:5000/discussions/groups/images/fgfdhgfhgfhfgh.jpg",
    //       },
    //       {
    //         imageID: "0000000005",
    //         imageURL: "http://localhost:5000/discussions/groups/images/ôpjihgqfgkhfdh.jpg",
    //       },
    //       {
    //         imageID: "0000000001",
    //         imageURL: "http://localhost:5000/discussions/groups/images/egrthrryjjk.jpg",
    //       },
    //       {
    //         imageID: "0000000004",
    //         imageURL: "http://localhost:5000/discussions/groups/images/omzugefuyGFV.jpg",
    //       },
    //       {
    //         imageID: "0000000003",
    //         imageURL: "http://localhost:5000/discussions/groups/images/gdfhfghfghfg.jpg",
    //       },
    //       {
    //         imageID: "0000000006",
    //         imageURL: "http://localhost:5000/discussions/groups/images/ozeuhfkjfg.jpg",
    //       },
    //     ],
    //   },
    // ],
    group: {
      groupID: 1,
      name: "My group",
      photoURL: "http://localhost:5000/users/photos/4.jpg"
    },
    members: [
      {
        userID: "0000000004",
        firstName: "John",
        online: 1,
        hidden: 0,
        gender: "M",
        photoURL: "http://localhost:5000/users/photos/1.jpg",
        lastReadMessageID: "0000000001",
        status: "member"
      },
      {
        userID: "0000000002",
        firstName: "Derrick",
        online: 1,
        hidden: 0,
        gender: "M",
        photoURL: "http://localhost:5000/users/photos/2.jpg",
        lastReadMessageID: "0000000001",
        status: "member"
      },
      {
        userID: "0000000003",
        firstName: "Amber",
        online: 1,
        hidden: 1,
        pseudo: "mbrLee98",
        lastReadMessageID: "0000000001",
        status: "member"
      }
    ]
  }
};

export default React.memo(DiscussionBullet);
