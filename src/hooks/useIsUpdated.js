import { useRef, useCallback } from "react";

const useIsUpdated = () => {
  const isUpdatedRef = useRef(false);
  const setUpdated = useCallback(() => {
    if (!isUpdatedRef.current) isUpdatedRef.current = true;
  }, []);
  return [isUpdatedRef.current, setUpdated];
};

export default useIsUpdated;
