import sendApiRequest from "../helpers/http";
import DOMAIN from "../config/network-config";
import { getAccessToken, getTokenAuthHeader } from "../helpers/jwt-helper.js";
import Crypto from "../helpers/crypto-helper.js";

const ENDPOINT = `http://${DOMAIN}/discussions`;

// Fetches a list of discussions for a user
const fetchDiscussions = async (
  page = 1,
  limit = 5,
  search = "",
  isExtended = true
) => {
  let URL = `${ENDPOINT}?page=${page}&search=${encodeURI(
    search
  )}&limit=${limit}`;
  if (isExtended) URL += "&ext=1";
  return await sendApiRequest(
    URL,
    "GET",
    null,
    getTokenAuthHeader(getAccessToken())
  );
};

// Fetches the messages fo a discussion
const fetchDiscussionMessages = async (type, discussionID, dateCheckup) => {
  const LIMIT = 10;
  const URL = `${ENDPOINT}/${discussionID}/messages?type=${type}&limit=${LIMIT}&dateCheck=${encodeURI(
    dateCheckup
  )}`;
  return sendApiRequest(URL);
};

export { fetchDiscussions, fetchDiscussionMessages };
