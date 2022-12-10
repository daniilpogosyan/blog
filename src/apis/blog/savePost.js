import httpClient from '../../http-client';
import { BASEURL } from './utils';
import { getBearerToken } from '../../storage/jwt';

export default async function savePost(post) {
  if (!post) {
    throw Error('post must be specified');
  }

  const url = new URL(BASEURL);

  const options = {
    body: JSON.stringify(post),
    headers: {
      Authorization: getBearerToken()
    }
  };

  let response;
  // The presence of post.id assumes updating existing post
  // If post.id does not exist, then create new post
  if (post.id) {
    url.pathname = `/posts/${post.id}`;
    response = await httpClient.put(url, options);
  } else {
    url.pathname = '/posts';
    response = await httpClient.post(url, options);
  }
}