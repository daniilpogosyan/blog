import { BASEURL } from "./utils";
import httpClient from "../../http-client";

export default async function signup({ email, password, username } = {}) {
  if (!email) {
    throw new Error('email is missing');
  }
  if (!password) {
    throw new Error('password is missing');
  }
  if (!username) {
    throw new Error('username is missing');
  }

  const url = new URL('/account/signup', BASEURL);
  const options = {
    body: JSON.stringify({ email, password, username })
  }

  const response = await httpClient.post(url, options);

  if (response.status >= 400) {
    throw new Error('signup was unsuccessful');
  }
}
