import React from "react";
import useMessagesList from "../../../../hooks/useMessagesList";
import useMessagesFrame from "../../../../hooks/useMessagesFrame";
import Spinner from "react-bootstrap/Spinner";
import "./style.scss";

import MessagesList from "../MessagesList";

const MessagesFrame = ({ discussion, loading }) => {
  const { messagesList, membersObj } = useMessagesList(discussion);
  const { frameRef } = useMessagesFrame(discussion);

  return (
    <section ref={frameRef} id="messages-frame" className="flex-fill">
      {loading === "more" && (
        <div className="loading-more text-primary text-center">
          <Spinner
            role="status"
            variant="primary"
            size="sm"
            className="mr-2"
            animation="border"
          />
          Loading
        </div>
      )}
      <MessagesList
        messagesList={messagesList}
        membersObj={membersObj}
        type={discussion.type}
        user={discussion.user}
        discussionID={discussion.discussionID}
      />
    </section>
  );
};

export default React.memo(MessagesFrame);
