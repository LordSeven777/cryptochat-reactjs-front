import React from "react";
import useDiscussion from "../../../hooks/useDiscussion";
import useDiscussionOption from "../../../hooks/useDiscussionOptions";
import "./style.scss";

import UpperBar from "./UpperBar";
import OptionsBar from "./OptionsBar";
import MessageForm from "./MessageForm";
import MessagesFrame from "./MessagesFrame";

const DiscussionPage = ({ isOpen, setOpen, match, location }) => {
  const { discussion, loading, isActive } = useDiscussion({ match, location });

  const { optionIsOpen, setOptionOpen } = useDiscussionOption();

  let pageClassName = "flex-fill flex-column";
  if (isOpen) pageClassName += " open";

  return (
    <section id="discussion-page" className={pageClassName}>
      <UpperBar
        isActive={isActive}
        loading={loading === "initial"}
        discussion={discussion}
        optionIsOpen={optionIsOpen}
        setOptionOpen={setOptionOpen}
        setDPageOpen={setOpen}
      />
      <div className="discussion-body flex-fill d-flex">
        <section className="flex-fill d-flex flex-column">
          {!discussion && <div className="flex-fill"></div>}
          {discussion && <MessagesFrame loading={loading} discussion={discussion} />}
          <MessageForm loading={loading === "initial"} discussion={discussion} />
        </section>
        {discussion && (
          <OptionsBar
            isActive={isActive}
            isOpen={optionIsOpen}
            loading={loading === "initial"}
            setOpen={setOptionOpen}
          />
        )}
      </div>
    </section>
  );
};

export default React.memo(DiscussionPage);
