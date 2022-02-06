import DOMAIN from "../config/network-config";
import sendApiRequest from "../helpers/http";
import { getTokenAuthHeader, getAccessToken } from "../helpers/jwt-helper.js";

const ENDPOINT = `http://${DOMAIN}/users`;

// Gets a user
const fetchUser = async userID => {
  const URL = `${ENDPOINT}/${userID}`;
  return sendApiRequest(URL, "GET", null, getTokenAuthHeader(getAccessToken()));
};

// Gets the suggestions of active users
const getActiveUsersSuggestions = async (page = 1, limit = 5) => {
  const URL = `${ENDPOINT}?accepted=1&page=${page}&limit=${limit}`;
  return await sendApiRequest(URL);
};

// Gets users having no contact with the current user
const fetchNoContactUsers = async (page = 1, limit = 5, search) => {
  let URL = `${ENDPOINT}?accepted=0&page=${page}&limit=${limit}`;
  if (search) URL += `&search=${encodeURI(search)}`;
  // console.log(URL);
  return await sendApiRequest(URL);
};

export { getActiveUsersSuggestions, fetchNoContactUsers, fetchUser };
