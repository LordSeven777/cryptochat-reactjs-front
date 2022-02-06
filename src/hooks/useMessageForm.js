import { useState, useCallback, useContext } from "react";
import authUserContext from "../contexts/authUser-context";
import { useDispatch } from "react-redux";
import { onNewMessage } from "../redux/discussion/discussion-actions.js";
import refactorUser from "../helpers/refactorUser-helper";
import ioObject from "../client-io.js";
import Crypto from "../helpers/crypto-helper.js";

const useMessageForm = discussion => {
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const { authUser } = useContext(authUserContext);

  // Handles the change of the content
  const handleContentChange = useCallback(e => setContent(e.target.value), []);

  // Handles the submission of the message
  const handleMessageSubmit = useCallback(
    e => {
      e.preventDefault();
      e.target.reset();

      const { type, discussionID, status, user, group, members } = discussion;
      const refactoredUser = refactorUser(authUser);

      const messageData = {
        message: {
          content,
          nature: "text",
          senderID: authUser.userID
        },
        discussion: {
          type,
          discussionID
        }
      };
      if (type === "peer") {
        messageData.message.receiverID = user.userID;
        messageData.discussion.status = {
          ...status,
          role: status.role === "requester" ? "requested" : "requester"
        };
        messageData.discussion.user = refactoredUser;
      } else {
        messageData.discussion.group = group;
        messageData.discussion.members = [members[0], members[1]];
      }

      // Sending the message data over the "send-message" socket event
      ioObject.socket.emit("send-message", messageData, (error, reply) => {
        if (error) console.log(error);

        dispatch(onNewMessage(reply.message, discussion));
      });

      // ioObject.socket.emit("chat", { userID: user.userID }, (error, reply) => {
      //   console.log(reply);
      // });
      //
      // ioObject.socket.on("chat-reply", data => {
      //   console.log(data);
      // });

      setContent("");
    },
    [content, discussion, authUser, dispatch]
  );

  return { content, handleContentChange, handleMessageSubmit };
};

export default useMessageForm;
