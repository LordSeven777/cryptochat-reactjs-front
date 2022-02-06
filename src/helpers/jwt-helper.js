// JWT keyname in localStorage
const jwtStorageKey = "access-token";

// Generates an authorization header for a JWT
const getTokenAuthHeader = token => {
  return [{ header: "Authorization", value: `Bearer ${token}` }];
};

// Gets the JWT access token from localStorage
const getAccessToken = () => localStorage.getItem(jwtStorageKey);

// Sets the JWT access token in localStorage
const setAccessToken = token => localStorage.setItem(jwtStorageKey, token);

export { getTokenAuthHeader, getAccessToken, setAccessToken };
