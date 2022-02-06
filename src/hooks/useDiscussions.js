import { useEffect, useCallback /* , useRef */, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  onDiscussionsFetch,
  onDiscussionsPageChange,
  onOthersFetch,
  onOthersPageChange,
  onInitChange,
  onNewMessage
} from "../redux/discussion/discussion-actions";
import authUserContext from "../contexts/authUser-context.js";
import useScrollEnd, { checkEndOfScroll } from "./useScrollEnd.js";
import ioObject from "../client-io.js";
import Crypto from "../helpers/crypto-helper.js";

const useDiscussions = (
  searchIsOpen,
  onSearchSrollEnd,
  sbFrameRef,
  sbWrapperRef,
  history,
  location
) => {
  const {
    loading,
    unreadNb,
    discussions,
    dPage,
    dDataEnd,
    others,
    oPage,
    oDataEnd,
    isInitial
  } = useSelector(state => state.discussion);
  const dispatch = useDispatch();

  const authUser = useContext(authUserContext).authUser;

  // Sets the discussions page to the next page
  const nextPage = useCallback(() => {
    if (searchIsOpen) onSearchSrollEnd();
    else {
      !dDataEnd && dispatch(onDiscussionsPageChange());
      dDataEnd && !oDataEnd && dispatch(onOthersPageChange());
    }
  }, [dispatch, dDataEnd, oDataEnd, onSearchSrollEnd, searchIsOpen]);

  // Navigates to the latest discussion if there's no targetted discussion initially
  useEffect(() => {
    if (
      location.pathname === "/discussions" &&
      isInitial &&
      discussions &&
      discussions.length > 0
    ) {
      history.push(
        `/discussions/${discussions[0].type}/${discussions[0].discussionID}`
      );
      dispatch(onInitChange(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discussions, isInitial]);

  useEffect(() => {
    !dDataEnd && dispatch(onDiscussionsFetch(dPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dPage]);

  useEffect(() => {
    // console.log(dDataEnd, oDataEnd);
    dDataEnd && !oDataEnd && dispatch(onOthersFetch(oPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oPage]);

  useEffect(() => {
    checkEndOfScroll(sbFrameRef, sbWrapperRef) && nextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discussions]);

  useScrollEnd(sbFrameRef, sbWrapperRef, nextPage);

  // Listening for message-related socket events
  useEffect(() => {
    // ioObject.socket.emit("greeting", "Hello!", (error, reply) => {
    //   console.log(reply);
    // });
    //
    // ioObject.socket.emit("make-test", authUser.userID, (error, reply) => {
    //   console.log(reply);
    // });

    ioObject.socket.on("message", messageData => {
      dispatch(onNewMessage(messageData.message, messageData.discussion));
    });
    // ioObject.socket.on("user-connection", user => {
    //   console.log(user);
    // });
    // socket.on("heyyy", console.log("boom"));
  }, [authUser.userID, dispatch]);

  return {
    loading,
    unreadNb,
    discussions,
    others,
    dataEnd: dDataEnd && oDataEnd
  };
};

export default useDiscussions;
