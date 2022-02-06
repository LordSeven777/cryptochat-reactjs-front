import { useEffect /* , useRef */ } from "react";
// import useIsUpdated from "./useIsUpdated";

// Checks if we're at the end of scroll
const checkEndOfScroll = (frameRef, wrapperRef) => {
  return (
    frameRef.current.offsetHeight + frameRef.current.scrollTop >= wrapperRef.current.offsetHeight
  );
};

const useScrollEnd = (frameRef, wrapperRef, onScrollEnd) => {
  // const [isUpdated, setUpdated] = useIsUpdated();
  // const handleScrollRef = useRef(null);

  useEffect(() => {
    // if (isUpdated) frameRef.current.removeEventListener("scroll", handleScrollRef.current);
    const handleScroll = () => {
      if (checkEndOfScroll(frameRef, wrapperRef)) onScrollEnd();
    };
    // handleScrollRef.current = handleScroll;
    frameRef.current.onscroll = handleScroll;
    // frameRef.current.addEventListener("scroll", handleScroll);
    // setUpdated();
    // return frameRef.current.removeEventListener("scroll", handleScroll);
  }, [onScrollEnd, frameRef, wrapperRef /* , isUpdated, setUpdated */]);
};

export default useScrollEnd;
export { checkEndOfScroll };
