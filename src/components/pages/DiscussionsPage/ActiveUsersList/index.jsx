import React from "react";
import ActiveUserBucket from "../ActiveUserBucket";

const ActiveUsersList = ({ users }) =>
  users.map((user) => <ActiveUserBucket key={user.userID} user={user} />);

export default React.memo(ActiveUsersList);
