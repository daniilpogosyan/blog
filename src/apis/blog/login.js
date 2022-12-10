import httpClient from "../../http-client";
import { setJWT } from "../../storage/jwt";
import { BASEURL } from "./utils";

export default async function login(email, password) {
  if (!email) {
    throw new Error('email is missing');
  }
  if (!password) {
    throw new Error('password is missing');
  }

  const url = new URL('/account/login', BASEURL);
  const options = {
    body: JSON.stringify({ email, password })
  }

  const response = await httpClient.post(url, options);
  
  if (response.status === 401) {
    throw new Error('Wrong password or email');
  }

  const jwt = await response.json();
  setJWT(jwt);
}