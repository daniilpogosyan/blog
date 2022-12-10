import signup from '../signup';
import httpClient from '../../../http-client';
import { BASEURL } from '../utils';


const email = 'myuniquemail@mock.com';
const password = 'bestPwdIsQWERTY';
const username = 'usernameIsMyName';

describe('signup()', () => {
  beforeEach(() => {
    jest.spyOn(httpClient, 'post').mockResolvedValue({status: 200});
  });

  test('sends POST request', async () => {
    await signup({ email, password, username });

    const actualUrl = httpClient.post.mock.lastCall[0];
    
    const expectedUrl = new URL('/account/signup', BASEURL);
    expect(actualUrl).toEqual(expectedUrl);

  });

  test('sets credentials in request body', async () => {
    await signup({ email, password, username });
    
    const actualOptions = httpClient.post.mock.lastCall[1];
    expect(JSON.parse(actualOptions.body)).toEqual({
      email: 'myuniquemail@mock.com',
      password: 'bestPwdIsQWERTY',
      username: 'usernameIsMyName'
    });
  });

  test.todo('does smth on successful signup');
});

describe('signup() throws error', () => {
  test('when password is missing', async () => {
    await expect(signup({ email, username })).rejects.toThrow('password is missing');
  });

  test('when email is missing', async () => {
    await expect(signup({ password, username })).rejects.toThrow('email is missing');
  });

  test('when username is missing', async () => {
    await expect(signup({ password, email })).rejects.toThrow('username is missing');
  });

  test('when signup was unsuccessful', async () => {
    jest.spyOn(httpClient, 'post').mockResolvedValueOnce({status: 500});
    await expect(signup({ email, password, username })).rejects.toThrow('signup was unsuccessful');
  });

  test.todo('when network error occured');
});