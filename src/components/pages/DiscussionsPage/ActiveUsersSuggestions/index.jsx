import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";

import useActiveUsersSuggestions from "../../../../hooks/useActiveUsersSuggestions";

import ActiveUsersList from "../ActiveUsersList";
import Loaders from "./Loaders";

const ActiveUsersSuggestions = () => {
  const frameRef = useRef(null);
  const wrapperRef = useRef(null);
  const jumpRef = useRef(0);
  const hiddenStateRef = useRef({ right: false, left: false });

  const [frameWidth, setFrameWidth] = useState(0);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [steps, setSteps] = useState(0);

  const [users, loadingState, onSlideEnd] = useActiveUsersSuggestions();

  // 1 bucket's width
  const BUCKET_WIDTH = 90;
  // Fore padding
  const FORE_PADDING = 20;

  // Handles the control of the slide
  const handleSlideControl = useCallback(
    (toForward = true) => {
      if (
        (!hiddenStateRef.current.right && toForward) ||
        (!hiddenStateRef.current.left && !toForward)
      )
        return;
      setSteps(steps + jumpRef.current * (toForward ? 1 : -1));
    },
    [steps]
  );

  useEffect(() => {
    const _frameWidth = frameRef.current.offsetWidth;
    // Initializing the frame's width on first render
    setFrameWidth(_frameWidth);
    // Initializing the number of jump steps on first render
    jumpRef.current = Math.floor((_frameWidth - FORE_PADDING) / BUCKET_WIDTH);
    // Resetting the frame's width on resize
    const resizeHandler = () => setFrameWidth(frameRef.current.offsetWidth);
    // Attaching the resize handler
    window.addEventListener("resize", resizeHandler);
    // Removing the resize handler on unmounting
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  useEffect(() => {
    // Translating the position of the slide when the steps changes
    if (wrapperRef) wrapperRef.current.style.transform = `translateX(-${BUCKET_WIDTH * steps}px)`;
  }, [steps]);

  useEffect(() => {
    // Setting the wrapper's width whenever the array of users changes
    setWrapperWidth(wrapperRef.current.offsetWidth);
  }, [users]);

  useEffect(() => {
    const { current: prevJump } = jumpRef.current;
    const currentJump = Math.floor((frameWidth - FORE_PADDING) / BUCKET_WIDTH);
    if (currentJump !== prevJump) {
      if (steps > 0) {
        if (steps < currentJump) setSteps(currentJump);
        else if (steps > currentJump) {
          const rest = steps % currentJump;
          if (rest > 0) setSteps(steps - rest);
        }
      }
      jumpRef.current = currentJump;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameWidth]);

  // Setting the hidden state of both ends and getting the frame's className
  const frameClassName = useMemo(() => {
    // Setting the hidden state of both ends
    if (wrapperRef.current) {
      // const wrapperWidth = users ? users.length * BUCKET_WIDTH + FORE_PADDING : 0;
      hiddenStateRef.current.right =
        frameWidth < wrapperWidth &&
        BUCKET_WIDTH * steps + FORE_PADDING + frameWidth < wrapperWidth;
      hiddenStateRef.current.left = steps > 0;
    }

    // Triggerring the "SlideEnd" event
    users && !hiddenStateRef.current.right && onSlideEnd();

    // Frame's className
    let frameClassName = "frame";
    if (hiddenStateRef.current.left) frameClassName += " hide-left";
    if (hiddenStateRef.current.right) frameClassName += " hide-right";

    return frameClassName;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrapperWidth, frameWidth, steps]);

  return (
    <article id="active-users-suggestions" className="bg-dark-2 px-2 py-3">
      <div ref={frameRef} className={frameClassName}>
        <button className="controller backward shadow-sm" onClick={() => handleSlideControl(false)}>
          <FontAwesomeIcon icon="angle-left" />
        </button>
        <button className="controller forward shadow-sm" onClick={handleSlideControl}>
          <FontAwesomeIcon icon="angle-right" />
        </button>
        <div ref={wrapperRef} className="wrapper d-flex">
          {loadingState === "initial" && (
            <>
              <Loaders />
              <Loaders />
            </>
          )}
          {users !== null && loadingState !== "initial" && <ActiveUsersList users={users} />}
          {loadingState === "more" && <Loaders />}
        </div>
      </div>
    </article>
  );
};

export default ActiveUsersSuggestions;
