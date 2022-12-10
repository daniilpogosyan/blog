import deletePost from '../deletePost';
import { BASEURL } from '../utils';
import httpClient from '../../../http-client';
import { getBearerToken, setJWT, removeJWT } from '../../../storage/jwt';


describe('deletePost()', () => {
  beforeEach(() => {
    jest.spyOn(httpClient, 'delete');
    setJWT('mock-jwt-for-successful-test');
  });

  test('sends DELETE request to a correct url', async () => {
    const postId = 'postid12345';
    await deletePost(postId);

    const urlForRequest = new URL(`posts/${postId}`, BASEURL);
    const actualURL = httpClient.delete.mock.lastCall[0];
    expect(actualURL).toEqual(expect.objectContaining(urlForRequest));

    const actualOptions = httpClient.delete.mock.lastCall[1];
    expect(actualOptions.headers.Authorization).toBe(getBearerToken());
  });
});

describe('deletePost() throws error', () => {
  beforeEach(() => {
    jest.spyOn(httpClient, 'delete');
  })
  
  test.todo('when network error occured');

  test('when postId is not specified', async () => {
    await expect(deletePost()).rejects.toThrow('postId must be specified');
  });

  test('when jwt does not exist', async () => {
    removeJWT();
    await expect(deletePost('postid1234qwer')).rejects.toThrow('JWT not found');
  });
})