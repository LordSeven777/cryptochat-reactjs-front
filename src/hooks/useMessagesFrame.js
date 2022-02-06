import { useEffect, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { onMessagesFetch } from "../redux/discussion/discussion-actions.js";

const useMessagesFrame = discussion => {
  const frameRef = useRef(null);

  const dispatch = useDispatch();

  const { type, discussionID, status, mEnd, messages } = discussion;
  const lastMessageDate = messages[messages.length - 1].date;

  // Top of scroll handler
  const handleTopScroll = useCallback(() => {
    if (frameRef.current.scrollTop === 0 && status && !mEnd) {
      dispatch(onMessagesFetch(type, discussionID, lastMessageDate));
    }
  }, [status, mEnd, dispatch, type, discussionID, lastMessageDate]);

  useEffect(() => {
    frameRef.current.onscroll = handleTopScroll;
    handleTopScroll();
  }, [handleTopScroll]);

  return { frameRef };
};

export default useMessagesFrame;
