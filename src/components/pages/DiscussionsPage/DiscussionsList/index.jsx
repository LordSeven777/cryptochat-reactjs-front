import React, { useContext } from "react";
import authUserContext from "../../../../contexts/authUser-context";
import Badge from "react-bootstrap/Badge";
import pluralize from "../../../../helpers/pluralize";
import "./style.scss";

import useDiscussions from "../../../../hooks/useDiscussions";

import Loaders from "./Loaders";
import DiscussionsGroup from "../DiscussionsGroup";

const DiscussionsList = ({
  frameRef,
  wrapperRef,
  searchIsOpen,
  sDiscussions,
  sLoading,
  sOthers,
  sDataEnd,
  onSearchSrollEnd,
  history,
  location,
  setDPageOpen,
}) => {
  const { loading, unreadNb, discussions, others, dataEnd } = useDiscussions(
    searchIsOpen,
    onSearchSrollEnd,
    frameRef,
    wrapperRef,
    history,
    location
  );

  const _discussions = searchIsOpen ? sDiscussions : discussions;
  const _others = searchIsOpen ? sOthers : others;
  const _dataEnd = searchIsOpen ? sDataEnd : dataEnd;
  const _loading = searchIsOpen ? sLoading : loading;

  const authUserID = parseInt(useContext(authUserContext).authUser.userID);

  return (
    <section id="discussions-list" className="flex-fill">
      <div className="wrapper px-1 px-sm-2 px-md-1 pt-3 pb-3">
        {_discussions !== null && (
          <>
            {!searchIsOpen && unreadNb > 0 && (
              <strong className="unread-msg-nb pl-2 mb-3 d-block">
                <Badge variant="primary">{unreadNb}</Badge> unread{" "}
                {pluralize("discussion", unreadNb > 0)}
              </strong>
            )}
            <DiscussionsGroup
              discussions={_discussions}
              authUserID={parseInt(authUserID)}
              location="dis"
              setDPageOpen={setDPageOpen}
            />
          </>
        )}
        {_others !== null && (
          <>
            {_others.length > 0 && (
              <strong className="pl-2 mb-3 d-block fw-600 mt-3">
                {searchIsOpen ? "More people" : "People you might know"}
              </strong>
            )}
            <DiscussionsGroup
              discussions={_others}
              authUserID={parseInt(authUserID)}
              location="oth"
              setDPageOpen={setDPageOpen}
            />
          </>
        )}
        {_loading && <Loaders />}
        {_dataEnd && <p className="end-result">No more result</p>}
      </div>
    </section>
  );
};

export default React.memo(DiscussionsList);
