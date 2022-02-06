import React, { useContext, Fragment } from "react";
import authUserContext from "../../../../contexts/authUser-context";
import moment from "moment";
import "./style.scss";

import MessageBlock from "../MessageBlock";

const MessagesList = ({
  messagesList,
  type,
  discussionID,
  membersObj,
  user
}) => {
  const dFormat = "YYYY-MM-DD HH:mm:ss";
  // Ref for the previous moment
  let prevMoment = moment(messagesList[0].date, dFormat);

  const authUserID = useContext(authUserContext).authUser.userID;

  // Ref for the previous message block's order for each message block
  let prevOrder = 0;

  return (
    <ul
      id="messages-list"
      className="d-flex flex-column-reverse px-1 py-3 m-0 list-unstyled"
    >
      {messagesList.map((msg, i, array) => {
        const curM = prevMoment;
        const prevM = array[i + 1] ? moment(array[i + 1].date, dFormat) : null;
        const _prevM = array[i + 1] ? moment(array[i + 1].date, dFormat) : null;
        const isDate =
          prevM === null || _prevM.add(40, "minutes").isBefore(curM, "seconds");
        prevMoment = prevM;

        let order = 0;
        if (!msg.notif) {
          const doesBegin =
            !prevM ||
            isDate ||
            array[i + 1].notif ||
            array[i + 1].senderID !== msg.senderID;
          if ([0, 1, 4].includes(prevOrder)) {
            order += 3;
          }
          if (doesBegin) order += 1;
          else if (order !== 3) order = 2;
        }
        prevOrder = order;

        const messageBlock = (
          <MessageBlock
            key={msg.messageID}
            type={type}
            message={msg}
            authUserID={authUserID}
            sender={type === "peer" ? user : membersObj[msg.senderID]}
            order={order}
          />
        );

        return !isDate ? (
          messageBlock
        ) : (
          <Fragment key={msg.messageID}>
            {messageBlock}
            <li className="message-date py-1">{curM.format("llll")}</li>
          </Fragment>
        );
      })}
    </ul>
  );
};

export default React.memo(MessagesList);
