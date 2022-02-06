import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";

const OptionsBar = ({ isOpen, setOpen }) => {
  return (
    <section id="d-options-bar" className={isOpen ? "open" : ""}>
      <div className="overlay flex-fill"></div>
      <div className="frame">
        <div className="wrapper px-3 pb-4">
          <div className="back mb-4 sticky-top">
            <button className="btn">
              <FontAwesomeIcon icon="arrow-left" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptionsBar;
