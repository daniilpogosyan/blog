import getComments from '../getComments';
import { BASEURL } from '../utils';
import httpClient from '../../../http-client';


describe('getComments()', () => {
  beforeEach(() => {
    jest.spyOn(httpClient, 'get')
      .mockResolvedValue({json: () => Promise.resolve('mock-data')});
  })
  
  test('calls httpClient.get() with a correct URL object', async () => {
    const postId = 'postid12345';
    const comments = await getComments(postId);
    const urlForRequest = new URL(`posts/${postId}/comments`, BASEURL);
    const actualURL = httpClient.get.mock.lastCall[0];
    expect(actualURL).toEqual(expect.objectContaining(urlForRequest));
  });

  test('throws when postId is not specified', async () => {
    await expect(getComments()).rejects.toThrow('`postId` must be a non-empty string`');
  });

  test('is called with multiple query params', async () => {
    const postId = 'postid0987';
    const comments = await getComments(postId, {
      limit: '15',
      sort: '-createdAt'
    });
    
    const actualUrlSearchParams = httpClient.get.mock.lastCall[0].searchParams;
    expect(actualUrlSearchParams.get('limit')).toBe('15');
    expect(actualUrlSearchParams.get('sort')).toBe('-createdAt');
  });
});
