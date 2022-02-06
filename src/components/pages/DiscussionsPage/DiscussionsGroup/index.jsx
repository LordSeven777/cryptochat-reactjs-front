import React from "react";

import DiscussionBullet from "../DiscussionBullet";

const ContactDiscussions = ({ discussions, authUserID, location, setDPageOpen }) => {
  return (
    <ul className="list-unstyled m-0">
      {discussions.map((discussion) => (
        <li key={`${discussion.type}-${discussion.discussionID}`} discussion={discussion}>
          <DiscussionBullet
            discussion={discussion}
            authUserID={authUserID}
            location={location}
            openDPage={setDPageOpen}
          />
        </li>
      ))}
    </ul>
  );
};

export default React.memo(ContactDiscussions);
