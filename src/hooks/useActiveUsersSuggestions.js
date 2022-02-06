import { useState, useEffect, useCallback } from "react";
import useApiCall from "./useApiCall";
import { getActiveUsersSuggestions } from "../apis/users-api";
import { mergeObjArrays } from "../helpers/arrays";

const useActiveUsersSuggestions = () => {
  const LIMIT = 5;

  const [users, setUsers] = useState(null);
  const [isDataEnd, setDataEnd] = useState(false);
  const [page, setPage] = useState(1);

  const [loadingState, callGetActiveUsersSuggestions] = useApiCall(getActiveUsersSuggestions);

  // Handles the "SlideEnd" event
  const handleSlideEnd = useCallback(async () => {
    if (isDataEnd) return;
    setPage(page + 1);
  }, [isDataEnd, page]);

  // Fetching the active users every time the page changes
  useEffect(() => {
    callGetActiveUsersSuggestions(page, LIMIT).then((newUsers) => {
      const currentUsers = mergeObjArrays(users, newUsers, "userID", false);
      if (users && currentUsers.length === users.length) setDataEnd(true);
      setUsers(currentUsers);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return [users, loadingState, handleSlideEnd];
};

export default useActiveUsersSuggestions;
