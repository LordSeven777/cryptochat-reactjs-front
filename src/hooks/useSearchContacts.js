import { useState, useEffect, useCallback } from "react";
import { fetchDiscussions } from "../apis/discussions-api";
import { fetchNoContactUsers } from "../apis/users-api.js";
import { checkEndOfScroll } from "./useScrollEnd";
import useIsUpdated from "./useIsUpdated";

const useSearchContact = (frameRef, wrapperRef) => {
  const [search, setSearch] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [discussions, setDiscussions] = useState([]);
  const [dPage, setDPage] = useState(1);
  const [dDataEnd, setDDataEnd] = useState(false);
  const [others, setOthers] = useState([]);
  const [oPage, setOPage] = useState(0);
  const [oDataEnd, setODataEnd] = useState(false);

  // Handle search open
  const handleOpen = useCallback((isToOpen = true) => {
    if (!isToOpen) {
      setSearch("");
      setDiscussions([]);
      setOthers([]);
      setDPage(1);
      setOPage(0);
      setDDataEnd(false);
      setODataEnd(false);
      setLoading(false);
    }
    setOpen(isToOpen);
  }, []);

  // Gets the searched discussions
  const getDiscussions = useCallback(
    (search, isInitial = true) => {
      const LIMIT = 5;
      setLoading(true);
      fetchDiscussions(dPage, LIMIT, search, false)
        .then(({ discussions: _discussions }) => {
          setLoading(false);
          setDDataEnd(_discussions.length < LIMIT);
          setDiscussions(isInitial ? _discussions : [...discussions, ..._discussions]);
        })
        .catch((error) => console.log(error.message));
    },
    [dPage, discussions]
  );

  // Handles the change of the search value
  const handleSearchChange = useCallback(
    (e) => {
      const { value: search } = e.target;
      setSearch(search);
      setDiscussions([]);
      setOthers([]);
      setDPage(1);
      setOPage(0);
      setDDataEnd(false);
      setODataEnd(false);
      if (!search) return;
      getDiscussions(search);
    },
    [getDiscussions]
  );

  // Handles the end of scroll
  const handleEndOfScroll = useCallback(() => {
    if (!dDataEnd) setDPage(dPage + 1);
    else if (!oDataEnd) setOPage(oPage + 1);
  }, [dPage, dDataEnd, oDataEnd, oPage]);

  const [isUpdated1, setUpdated1] = useIsUpdated();
  const [isUpdated2, setUpdated2] = useIsUpdated();

  useEffect(() => {
    if (isUpdated1) {
      getDiscussions();
    }
    setUpdated1();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dPage]);

  useEffect(() => {
    if (isUpdated2 && oPage >= 1) {
      const LIMIT = 5;
      setLoading(true);
      fetchNoContactUsers(oPage, LIMIT, search)
        .then((_others) => {
          setLoading(false);
          setODataEnd(_others.length < LIMIT);
          setOthers([
            ...others,
            ..._others.map((user, i) => ({
              type: "peer",
              discussionID: `${Date.now().toString()}-${i}`,
              user,
              messages: [],
            })),
          ]);
        })
        .catch((error) => console.log(error.message));
    }
    setUpdated2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oPage]);

  useEffect(() => {
    !loading && search && checkEndOfScroll(frameRef, wrapperRef) && handleEndOfScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discussions]);

  return [
    isOpen,
    handleOpen,
    search,
    handleSearchChange,
    loading,
    discussions,
    others,
    dDataEnd && oDataEnd,
    handleEndOfScroll,
  ];
};

export default useSearchContact;
