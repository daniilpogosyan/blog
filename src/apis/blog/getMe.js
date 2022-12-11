import httpClient from "../../http-client";
import { getBearerToken } from "../../storage/jwt";
import { BASEURL } from "./utils";

export default async function getMe() {
  const url = new URL('/account', BASEURL);
  const options = {
    headers: {
      Authorization: getBearerToken()
    }
  }

  const response = await httpClient.get(url, options);
  if (response.status >= 400) {
    throw new Error('authentication failed');
  }

  return response.json();
}
