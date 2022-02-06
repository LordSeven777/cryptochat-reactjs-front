import getUsername from "./username";

// Returns the notification data for a peer discussion
const peerNotification = (status, user) => {
  const name = getUsername(user, false);
  let message;

  switch (status.name) {
    case "pending":
      message =
        status.role === "requester"
          ? `You sent a request to ${name}`
          : `${user.lastName} sent you request`;
      break;

    case "accepted":
      message = `${name} is now your contact`;
      break;

    case "blocked":
      message = status.role === "requester" ? `You blocked ${name}` : `${name} blocked you`;
      break;

    default:
      break;
  }

  return {
    message,
    date: status.date,
  };
};

// Returns the notification data for a group discussion
const groupNofitication = (group, statusMember, authUserID, isInitial = false) => {
  if (isInitial)
    return {
      message: `Welcome to ${group.name}`,
      date: group.creationDate,
    };

  let message;
  const name = getUsername(statusMember, false);

  switch (statusMember.status) {
    case "admin":
    case "member":
      message =
        statusMember.userID === authUserID
          ? `You were added to the group`
          : `${name} was added to the group`;
      break;

    case "out":
      message =
        statusMember.userID === authUserID
          ? `You're out of the group`
          : `${name} is out of the group`;
      break;

    case "blocked":
      message =
        statusMember.userID === authUserID
          ? `You're blocked from the group`
          : `${name} is blocked from the group`;
      break;

    default:
      break;
  }

  return { message, date: statusMember.statusDate };
};

export { peerNotification, groupNofitication };
