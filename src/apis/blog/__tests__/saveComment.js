import httpClient from '../../../http-client'
import saveComment from '../saveComment';
import { setJWT, removeJWT, getBearerToken } from '../../../storage/jwt';
import { BASEURL } from '../utils';

beforeEach(() => {
  setJWT('sometoken1234');
});

describe('saveComment()', () => {
  beforeEach(() => {
    jest.spyOn(httpClient, 'post');
    jest.spyOn(httpClient, 'put');
  });

  test('sends POST request when comment.id does not exist', async () => {
    const postId = 'target_post_id1234';

    const comment = {
      body: 'mock-body',
      post: postId
    };

    await saveComment(comment);
    expect(httpClient.post).toHaveBeenCalled();
    expect(httpClient.put).not.toHaveBeenCalled();
    
    const actualURL = httpClient.post.mock.lastCall[0];
    expect(actualURL.href).toBe(`${BASEURL}/posts/${postId}/comments`);

    const bearerToken = httpClient.post.mock.lastCall[1].headers.Authorization;
    expect(bearerToken).toBe(getBearerToken());

    const body = httpClient.post.mock.lastCall[1].body;
    expect(body).toBe(JSON.stringify(comment));
  });

  test('sends PUT request when comment.id exists', async () => {
    const postId = 'target_post_id1234';
    const comment = {
      title: 'mock-title',
      id: '12345',
      post: postId
    }

    await saveComment(comment);
    expect(httpClient.put).toHaveBeenCalled();
    expect(httpClient.post).not.toHaveBeenCalled();

    const actualURL = httpClient.put.mock.lastCall[0];
    expect(actualURL.href).toBe(`${BASEURL}/posts/${comment.post}/comments/${comment.id}`);

    const bearerToken = httpClient.put.mock.lastCall[1].headers.Authorization;
    expect(bearerToken).toBe(getBearerToken());

    const body = httpClient.put.mock.lastCall[1].body;
    expect(body).toBe(JSON.stringify(comment));
  });
});

describe('saveComment() throws error', () => {
  test.todo('when network error occured');

  test('when comment is not specified', async () => {
    await expect(saveComment()).rejects.toThrow('comment must be specified');
  });

  test.each([
    {
      comment: { body: 'I am a comment without post', id: '12345' },
      message: 'comment with id'
    },
    {
      comment: { body: 'I am a comment without post'},
      message: 'comment without id'
    }
  ])('when saving $message if comment.post is undefined', async ({comment}) => {
    await expect(saveComment(comment)).rejects.toThrow('comment.post must be specified');
  });

  test.each([
    {
      comment: { smth: 'mock', post: 'postIdabcde123', id: 'someExistingId' },
      message: 'comment with id'
    },
    {
      comment: { smth: 'mock', post: 'postId556acd' },
      message: 'comment without id'
    }
  ])('when saving $message if jwt does not exists ', async ({comment}) => {
    removeJWT(); // make sure that jwt does not exist
    await expect(saveComment(comment)).rejects.toThrow('JWT not found');
  });
});
