import React, { useState, useCallback } from "react";
import { Route } from "react-router-dom";
import "./style.scss";

import Sidebar from "./Sidebar";
import DiscussionPage from "../DiscussionPage";
import BlankDiscussionPage from "./BlankDiscussionPage";

const DiscussionsPage = ({ history, location }) => {
  const [dPageIsOpen, setDPageOpen] = useState(true);

  const openDPage = useCallback((value) => setDPageOpen(value), []);

  return (
    <section id="discussions-page" className="d-flex">
      <Sidebar history={history} location={location} setDPageOpen={setDPageOpen} />
      <Route path="/discussions" exact component={BlankDiscussionPage} />
      <Route
        path="/discussions/:type/:id"
        render={(props) => <DiscussionPage isOpen={dPageIsOpen} setOpen={openDPage} {...props} />}
      />
    </section>
  );
};

export default DiscussionsPage;
