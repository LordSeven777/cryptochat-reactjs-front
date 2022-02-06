import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const BlankDiscussionPage = () => {
  const { discussions } = useSelector((state) => state.discussion);

  return (
    <div className="blank-discussion flex-fill bg-dark-1">
      {!discussions && <p>Loading ...</p>}
      {discussions !== null && <p className="display-4 text-secondary">No discussion selected</p>}
    </div>
  );
};

export default BlankDiscussionPage;
