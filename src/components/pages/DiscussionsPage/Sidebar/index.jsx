import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import "./style.scss";

import useSearchContact from "../../../../hooks/useSearchContacts";

import OptionsDropdwon from "../OptionsDropdwon";
import SearchContacts from "../SearchContacts";
import ActiveUsersSuggestions from "../ActiveUsersSuggestions";
import DiscussionsList from "../DiscussionsList";

const Sidebar = ({ history, location, setDPageOpen }) => {
  const frameRef = useRef(null);
  const wrapperRef = useRef(null);

  const [
    searchIsOpen,
    onSearchOpen,
    search,
    onSearchChange,
    sLoading,
    sDiscussions,
    sOthers,
    sDataEnd,
    onSearchSrollEnd,
  ] = useSearchContact(frameRef, wrapperRef);

  return (
    <section id="discussions-sidebar">
      <SimpleBar scrollableNodeProps={{ ref: frameRef }} className="discussions-sidebar-simplebar">
        <div ref={wrapperRef} className="discussions-sidebar-wrapper d-flex flex-column">
          <div className="upper d-flex justify-content-between align-items-center flex-wrap bg-dark-1 p-3">
            <h1>Discussions</h1>
            <article className="d-flex">
              <Button variant="light" className="mr-2">
                <FontAwesomeIcon icon="users" />
              </Button>
              <OptionsDropdwon />
            </article>
            <SearchContacts
              isOpen={searchIsOpen}
              search={search}
              onOpen={onSearchOpen}
              onChange={onSearchChange}
            />
          </div>
          {!searchIsOpen && <ActiveUsersSuggestions />}
          <DiscussionsList
            frameRef={frameRef}
            wrapperRef={wrapperRef}
            searchIsOpen={searchIsOpen}
            sLoading={sLoading}
            sDiscussions={sDiscussions}
            sOthers={sOthers}
            sDataEnd={sDataEnd}
            onSearchSrollEnd={onSearchSrollEnd}
            history={history}
            location={location}
            setDPageOpen={setDPageOpen}
          />
        </div>
      </SimpleBar>
    </section>
  );
};

export default Sidebar;
