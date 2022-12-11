import httpClient from "../../http-client";
import { getBearerToken } from "../../storage/jwt";
import { BASEURL } from "./utils";

export default async function saveComment(comment) {
  const url = new URL(BASEURL);

  if (!comment) {
    throw new Error('comment must be specified');
  }

  if(!comment.post) {
    throw new Error('comment.post must be specified');
  }

  const options = {
    headers: {
      Authorization: getBearerToken()
    },
    body: JSON.stringify(comment)
  }

  if (comment.id) {
    url.pathname = `/posts/${comment.post}/comments/${comment.id}`;
    await httpClient.put(url, options);
  } else {
    url.pathname = `/posts/${comment.post}/comments`;
    await httpClient.post(url, options);
  }
}