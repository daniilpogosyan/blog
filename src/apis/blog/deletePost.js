import { BASEURL } from "./utils";
import httpClient from "../../http-client";
import { getBearerToken } from "../../storage/jwt";

export default async function deletePost(postId) {
  if (!postId) {
    throw new Error('postId must be specified');
  }
  
  const url = new URL(`posts/${postId}`, BASEURL);

  const response = httpClient.delete(url, {
    headers: {
      Authorization: getBearerToken()
    }
  })

  return response;
}