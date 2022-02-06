import { useState, useCallback, useRef } from "react";

const useApiCall = (apiRequest, isBoolLoading = false, isLoaded = false) => {
  const [isLoading, setLoading] = useState(!isLoaded);
  const [loadingState, setLoadingState] = useState(
    !isLoaded ? "initial" : null
  );

  // Calls counter ref
  const counterRef = useRef(isLoaded ? 1 : 0);

  // The wrapper method which calls the api
  const callApi = useCallback(
    async (...args) => {
      // Setting as loading
      if (isBoolLoading && !isLoading) setLoading(true);
      else if (!isBoolLoading) {
        if (!loadingState)
          setLoadingState(counterRef.current === 0 ? "initial" : "more");
        counterRef.current++;
      }

      let apiResponse;
      try {
        // Calling the API
        apiResponse = await apiRequest(...args);
        // Setting as loaded
        if (isBoolLoading) setLoading(false);
        else setLoadingState(null);
      } catch (e) {
        // Setting as loaded
        if (isBoolLoading) setLoading(false);
        else setLoadingState(null);
        throw e;
      }

      return apiResponse;
    },
    [isLoading, loadingState, isBoolLoading, apiRequest]
  );
  // console.log(loadingState);

  return [isBoolLoading ? isLoading : loadingState, callApi];
};

export default useApiCall;
