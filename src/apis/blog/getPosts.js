import httpClient from '../../http-client';
import { getBearerToken } from '../../storage/jwt';
import { BASEURL } from './utils';

export default async function getPosts(params = {}) {
  const url = new URL('posts', BASEURL);
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
