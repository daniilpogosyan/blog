import getPosts from '../getPosts';
import { BASEURL } from '../utils';
import httpClient from '../../../http-client';
import { getBearerToken, setJWT, removeJWT } from '../../../storage/jwt';


describe('getPosts()', () => {
  beforeEach(() => {
    jest.spyOn(httpClient, 'get')
      .mockResolvedValue({json: () => Promise.resolve('mock-data')});
  })
  
  test('calls httpClient.get() with a correct URL object', async () => {
    const posts = await getPosts();
    const urlForRequest = new URL('posts', BASEURL);
    const actualURL = httpClient.get.mock.lastCall[0];
    expect(actualURL).toEqual(expect.objectContaining(urlForRequest));
  });

  test('is called with a query parameter', async () => {
    const posts = await getPosts({
      limit: '3'
    });
    const urlForRequest = new URL('posts', BASEURL);
    urlForRequest.searchParams.set('limit', '3');
    const actualURL = httpClient.get.mock.lastCall[0];
    expect(actualURL).toEqual(expect.objectContaining(urlForRequest));
  });

  test('is called with multiple query parameters', async () => {
    const params = {
      limit: '5',
      author: 'mockAthorId1234',
      sort: '-createdAt'
    };

    const posts = await getPosts(params);
    const actualURL = httpClient.get.mock.lastCall[0];
    for (const param in params) {
      expect(actualURL.searchParams.get(param)).toBe(params[param]);
    }
  });

  // Requests with query 'author' set to 'me'
  // should be provided withJWT in Authentication header 
  describe('is called with query author=me', () => {
    afterEach(() => {
      removeJWT();
    });

    test('jwt exists', async () => {
      setJWT('token12345');
      const posts = await getPosts({author: 'me'});
  
      expect(httpClient.get).toHaveBeenCalledWith(
        expect.anything(), // do not care about url here
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: getBearerToken()
          })
        })
      )
    });

    test('jwt do not exists', async () => {
      await expect(getPosts({author: 'me'})).rejects.toThrow('JWT not found');
    });
  })
})


