import httpClient from '../../http-client';
import { BASEURL } from './utils';

export default async function getComments(postId, params = {}) {
  if (typeof postId !== 'string' || postId.length === 0) {
    throw new Error('`postId` must be a non-empty string`');
  }

  const url = new URL(`posts/${postId}/comments`, BASEURL);
  const paramsEntries = Object.entries(params);
  Object.entries(params).forEach(([param, value]) => {
    url.searchParams.set(param, value);
  });

  const response = await httpClient.get(url);
  
  return response.json();
}