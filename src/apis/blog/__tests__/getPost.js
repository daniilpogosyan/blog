import getPost from '../getPost';
import { BASEURL } from '../utils';
import httpClient from '../../../http-client';
import { getBearerToken, setJWT, removeJWT } from '../../../storage/jwt';

beforeEach(() => {
  removeJWT(); // make sure, that jwt does not exists yet
})

describe('getPost() returns post data', () => {
  beforeEach(() => {
    jest.spyOn(httpClient, 'get')
      .mockResolvedValue({json: () => Promise.resolve('mock-data')});
  })
  
  test('calls httpClient.get() with a correct URL object', async () => {
    const postId = 'postid12345';
    const post = await getPost(postId);
    const urlForRequest = new URL(`posts/${postId}`, BASEURL);
    const actualURL = httpClient.get.mock.lastCall[0];
    expect(actualURL).toEqual(expect.objectContaining(urlForRequest));
    expect(post).toBe('mock-data');
  });

  // Requests with query 'author' set to 'me'
  // should be provided withJWT in Authentication header 
  test('attaches token to request with authorization', async () => {
    const postId = 'a2bd1233beacd';
    setJWT('token12345');
    const post = await getPost(postId, {author: 'me'});

    expect(httpClient.get).toHaveBeenCalledWith(
      expect.anything(), // do not care about url here
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: getBearerToken()
        })
      })
    )
    expect(post).toBe('mock-data');
  });
})


describe('getPost() throws error', () => {
  test.todo('when network error occured');

  test.todo('when post not found')

  test('when postId is not specified', async () => {
    await expect(getPost()).rejects.toThrow('`postId` must be a non-empty string`');
  });

  test('when author=me, but jwt does not exists', async () => {
    const postId = 'a2b5gceafd1adacd';
    await expect(getPost(postId, {author: 'me'})).rejects.toThrow('JWT not found');
  });
});
