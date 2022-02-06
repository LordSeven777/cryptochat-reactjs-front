import sendApiRequest from "../helpers/http.js";
import DOMAIN from "../config/network-config.js";

const ENDPOINT = `http://${DOMAIN}/auth`;

// Logs a user in in API
const loginUser = async ({ email_pseudo, password }) => {
  const URL = `${ENDPOINT}/login`;
  const loginData = { email_pseudo, password };
  console.log(loginData);
  return await sendApiRequest(URL, "POST", loginData);
};

export { loginUser };
