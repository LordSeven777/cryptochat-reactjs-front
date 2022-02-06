import { useMemo, useContext } from "react";
import authUserContext from "../contexts/authUser-context";
import {
  peerNotification,
  groupNofitication
} from "../helpers/disNotif-helper";
import { getRandom } from "../helpers/numbers.helper";

const useMessagesList = discussion => {
  const { type, messages, user, group, members, status, mEnd } = discussion;

  // Authenticated user's ID
  const authUserID = useContext(authUserContext).authUser.userID;

  // Messages number
  const n = messages.length;

  // Creation date of a group
  const creationDate = type === "peer" ? null : group.creationDate;
  // Members on notifications
  const notifMembers = useMemo(() => {
    if (type === "peer") return null;
    return members.filter(
      m =>
        (m.status !== "admin" || m.statusDate !== creationDate) &&
        ((m.statusDate >= messages[n - 1].date && !mEnd) || mEnd)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, members, creationDate, messages, mEnd]);

  // The filtered viewers within the time frame of the messages
  const fViewers = useMemo(() => {
    if (type === "peer") return null;
    if (n === 0) return [];
    return members.filter(
      m => m.mDate >= messages[n - 1].date && parseInt(m.userID) !== authUserID
    );
  }, [type, messages, members, n, authUserID]);

  // Object of members each key as each members's userID
  const membersObj = useMemo(() => {
    if (!members) return null;
    const obj = {};
    for (const m of members) obj[m.userID] = m;
    return obj;
  }, [members]);

  const messagesList = useMemo(() => {
    const mList = [];
    if (type === "peer") {
      let lrI = 0,
        sCheck = false;
      if (messages[0] && status.date > messages[0].date) {
        mList.push({
          messageID: getRandom(),
          content: peerNotification(status, user).message,
          date: status.date,
          notif: true
        });
        sCheck = true;
      }
      for (let i = 0; i < n; i++) {
        const isOwned = messages[i].senderID === authUserID;
        if (!isOwned || (isOwned && messages[i].status === "read"))
          lrI = sCheck ? i + 1 : i;
        mList.push(
          i === 0 && isOwned && messages[i].status !== "read"
            ? { ...messages[i], onStatus: true }
            : messages[i]
        );
        if (
          /*(i + 1 < n && !sCheck && status.date <= messages[i + 1].date) ||*/
          i === n - 1 &&
          mEnd &&
          !sCheck
        ) {
          mList.push({
            messageID: getRandom(),
            content: peerNotification(status, user).message,
            date: status.date,
            notif: true
          });
          sCheck = true;
        }
      }
      if (lrI > 0) mList[lrI] = { ...mList[lrI], viewers: [user] };
    } else {
      const msgViewers = {};
      // const msgSenders = {};
      fViewers.forEach(v => {
        if (!msgViewers[v.lastReadMessageID])
          msgViewers[v.lastReadMessageID] = [];
        msgViewers[v.lastReadMessageID].unshift(v);
      });
      let j = notifMembers.length - 1;
      while (j >= 0 && notifMembers[j].statusDate > messages[0].date) {
        mList.push({
          messageID: getRandom(),
          content: groupNofitication(group, notifMembers[j], authUserID)
            .message,
          date: notifMembers[j].statusDate,
          notif: true
        });
        j--;
      }
      messages.forEach((m, i, a) => {
        let message = m;
        if (msgViewers[m.messageID])
          message = { ...message, viewers: msgViewers[m.messageID] };
        if (
          i === n - 1 &&
          parseInt(message.senderID) === authUserID &&
          message.status !== "read"
        )
          message = { ...message, onStatus: true };
        mList.push(message);
        while (
          j >= 0 &&
          notifMembers[j].statusDate <= m.date &&
          (i + 1 === n || a[i + 1].date > msgViewers.statusDate)
        ) {
          mList.push({
            messageID: getRandom(),
            content: groupNofitication(group, notifMembers[j], authUserID)
              .message,
            date: notifMembers[j].statusDate,
            notif: true
          });
          j--;
        }
      });
      if (mEnd)
        mList.push({
          messageID: getRandom(),
          content: `${group.name} was created`,
          date: group.creationDate,
          notif: true
        });
    }
    return mList;
  }, [
    type,
    status,
    user,
    n,
    messages,
    fViewers,
    notifMembers,
    mEnd,
    group,
    authUserID
  ]);

  // console.log(messagesList);

  return { messagesList, membersObj };
};

export default useMessagesList;
