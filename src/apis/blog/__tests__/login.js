import login from '../login';
import httpClient from '../../../http-client';
import { BASEURL } from '../utils';
import { removeJWT, getJWT } from '../../../storage/jwt';

beforeEach(() => {
  removeJWT();
});


describe('login()', () => {
  const credentials = {
    email: 'myuniquemail@mock.com',
    password: 'bestPwdIsQWERTY'
  };
  const mockJWT = 'receivedMockJWTOnSuccessAuthentication';
  beforeEach(() => {
    jest.spyOn(httpClient, 'post').mockResolvedValue({json: () => Promise.resolve(mockJWT)});
  });

  test('sends POST request to the correct url', async () => {
    await login(credentials.email, credentials.password);
    const actualUrl = httpClient.post.mock.lastCall[0];
    const expectedUrl = new URL('/account/login', BASEURL);
    expect(actualUrl).toEqual(expectedUrl);
  });

  test('set credentials in request body', async () => {
    await login(credentials.email, credentials.password);
    const actualOptions = httpClient.post.mock.lastCall[1];
    expect(JSON.parse(actualOptions.body)).toEqual(credentials);
  });

  test('stores received jwt', async () => {
    await login(credentials.email, credentials.password);
    expect(getJWT()).toBe(mockJWT);
  });
});

describe('login() throws error', () => {
  beforeEach(() => {
    jest.spyOn(httpClient, 'post');
  });

  test('when passsword is missing', async () => {
    await expect(login('mailonly@mail.com')).rejects.toThrow('password is missing')
    expect(httpClient.post).not.toHaveBeenCalled()
  });

  test('when email is missing', async () => {
    await expect(login(null, 'onlyPassworD')).rejects.toThrow('email is missing')
    expect(httpClient.post).not.toHaveBeenCalled()
  });

  test('when sent wrong credentials', async () => {
    const wrongCredentials = {
      email: 'possiblywrong@mockmail.com',
      password: 'possiblywrongPASSWORD'
    };
    jest.spyOn(httpClient, 'post').mockResolvedValueOnce({status: 401});

    await expect(login(wrongCredentials.email, wrongCredentials.password))
      .rejects.toThrow('Wrong password or email');
  });

  test.todo('when network error occured');
});