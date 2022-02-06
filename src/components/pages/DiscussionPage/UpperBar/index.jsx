import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";

import Loaders from "./Loaders";
import UserAvatar from "../../../common/UserAvatar";
import Username from "../../../common/Username";

const UpperBar = ({ loading, discussion, optionIsOpen, setOptionOpen, isActive, setDPageOpen }) => {
  let togglerClassName = "btn px-0";
  if (optionIsOpen) togglerClassName += " open";

  return (
    <section className="upper-bar px-3 d-flex align-items-center no-wrap">
      <div className="flex-fill d-flex align-items-center">
        <button id="hide-discussion" className="btn" onClick={() => setDPageOpen(false)}>
          <FontAwesomeIcon icon="arrow-left" />
        </button>
        {loading && <Loaders />}
        {discussion && !loading && (
          <>
            <UserAvatar
              type={discussion.type}
              user={discussion.user}
              group={discussion.group}
              members={discussion.members}
              className="d-avatar"
            />
            <div className="d-flex flex-column ml-2">
              <p className="name fw-600">
                {discussion.type === "peer" ? (
                  <Username user={discussion.user} />
                ) : (
                  discussion.group.name
                )}
              </p>
              {isActive && discussion.type === "peer" && (
                <p className="active-status mb-0">Active</p>
              )}
            </div>
          </>
        )}
      </div>
      {discussion && !loading && (
        <button
          id="toggle-options"
          className={togglerClassName}
          onClick={() => setOptionOpen(!optionIsOpen)}
        >
          <FontAwesomeIcon icon="info-circle" />
        </button>
      )}
    </section>
  );
};

export default React.memo(UpperBar);
