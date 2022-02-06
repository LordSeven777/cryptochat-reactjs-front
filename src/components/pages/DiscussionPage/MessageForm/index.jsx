import React from "react";
import useMessageForm from "../../../../hooks/useMessageForm";
import TextareaAutosize from "react-textarea-autosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";

const MessageForm = ({ discussion }) => {
  const { content, handleContentChange, handleMessageSubmit } = useMessageForm(
    discussion
  );

  return (
    <section className="form-section">
      <div className="wrapper">
        <form
          id="message-form"
          className="d-flex align-items-end"
          onSubmit={handleMessageSubmit}
        >
          <div className="px-1">
            <button type="button" className="btn text-primary pick-photo">
              <FontAwesomeIcon icon="file-image" />
            </button>
          </div>
          <div className="flex-fill">
            <TextareaAutosize
              maxRows={3}
              minRows={1}
              className="form-control app-input w-100"
              placeholder="Enter your message"
              value={content}
              onChange={handleContentChange}
            />
          </div>
          <div className="px-2">
            <button className="btn btn-primary send-message">
              <FontAwesomeIcon icon="paper-plane" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MessageForm;
