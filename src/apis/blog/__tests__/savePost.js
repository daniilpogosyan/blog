import httpClient from '../../../http-client'
import savePost from '../savePost';
import { setJWT, removeJWT, getBearerToken } from '../../../storage/jwt';
import { BASEURL } from '../utils';

describe('savePost()', () => {
  beforeEach(() => {
    jest.spyOn(httpClient, 'post');
    jest.spyOn(httpClient, 'put');
    setJWT('sometoken1234');
  });

  test('sends POST request when post.id does not exist', async () => {
    const post = {
      title: 'mock-title',
    }

    await savePost(post);
    expect(httpClient.post).toHaveBeenCalled();
    expect(httpClient.put).not.toHaveBeenCalled();
    
    const actualURL = httpClient.post.mock.lastCall[0];
    expect(actualURL.href).toBe(`${BASEURL}/posts`);

    const bearerToken = httpClient.post.mock.lastCall[1].headers.Authorization;
    expect(bearerToken).toBe(getBearerToken());

    const body = httpClient.post.mock.lastCall[1].body;
    expect(body).toBe(JSON.stringify(post));
  });

  test('sends PUT request when post.id exists', async () => {
    const post = {
      title: 'mock-title',
      id: '12345',
    }

    await savePost(post);
    expect(httpClient.put).toHaveBeenCalled();
    expect(httpClient.post).not.toHaveBeenCalled();

    const actualURL = httpClient.put.mock.lastCall[0];
    expect(actualURL.href).toBe(`${BASEURL}/posts/${post.id}`);

    const bearerToken = httpClient.put.mock.lastCall[1].headers.Authorization;
    expect(bearerToken).toBe(getBearerToken());

    const body = httpClient.put.mock.lastCall[1].body;
    expect(body).toBe(JSON.stringify(post));
  });
});

describe('savePost() throws error', () => {
  test.todo('when network error occured');
  test('when post is not specified', async () => {
    await expect(savePost()).rejects.toThrow('post must be specified');
  });

  test.each([
    {
      post: {smth: 'mock', id: 'someExistingId'},
      message: 'post with id'
    },
    {
      post: {smth: 'mock'},
      message: 'post without id'
    }
  ])('when saving $message if jwt does not exists ', async ({post}) => {
    removeJWT(); // make sure that jwt does not exist
    await expect(savePost(post)).rejects.toThrow('JWT not found');
  });
})