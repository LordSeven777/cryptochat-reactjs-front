const storageKey = "auth-user";

// Gets the auth user's cache from the localStorage
const getAuthUserCache = () => {
  const data = localStorage.getItem(storageKey);
  if (!data) return null;
  return JSON.parse(data);
};

// Sets the auth user's cache in the localStorage
const setAuthUserCache = user =>
  localStorage.setItem(storageKey, JSON.stringify(user));

export { getAuthUserCache, setAuthUserCache };
