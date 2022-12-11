import httpClient from '../../http-client';
import { getBearerToken } from '../../storage/jwt';
import { BASEURL } from './utils';

export default async function getPost(postId, params = {}) {
  if (typeof postId !== 'string' || postId.length === 0) {
    throw new Error('`postId` must be a non-empty string`');
  }

  const url = new URL(`posts/${postId}`, BASEURL);
  Object.entries(params).forEach(([param, value]) => {
    url.searchParams.set(param, value);
  });

  
  const options = {};
  if (params.author === 'me') {  
    options.headers = {
      Authorization: getBearerToken()
    }
  }
  const response = await httpClient.get(url, options);
  
  return response.json();
}
