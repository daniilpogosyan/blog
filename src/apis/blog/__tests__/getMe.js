import httpClient from "../../../http-client";
import { getBearerToken, setJWT, removeJWT } from '../../../storage/jwt';
import { BASEURL } from "../utils";
import getMe from '../getMe';


beforeEach(() => {
  setJWT('mockjwt');
});

describe('getUser()', () => {
  const mockUser = {
    username: 'mockuser',
    email: 'mockmail@mail.com'
  };

  beforeEach(() => {  
    jest.spyOn(httpClient, 'get').mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(mockUser)
    });
  });

  test('send GET request to the correct url', async () => {
    await getMe();
    const actualUrl = httpClient.get.mock.lastCall[0];
    const expectedUrl = new URL('/account', BASEURL);
    expect(actualUrl).toEqual(expectedUrl);
  });
  
  test('set jwt in request header', async () => {
    await getMe();
    const actualOptions = httpClient.get.mock.lastCall[1];
    expect(actualOptions.headers).toHaveProperty('Authorization', getBearerToken());
  });
  
  test('returns user data', async () => {
    const user = await getMe();
    expect(user).toEqual(mockUser);
  });
});

describe('getUser() throws error', () => {
  test.todo('when network error occured');

  test('when jwt does not exist', async () => {
    removeJWT();
    await expect(getMe()).rejects.toThrow('JWT not found');
  });

  test('when authentication is failed', async () => {
    jest.spyOn(httpClient, 'get').mockResolvedValueOnce({
      status: 400,
      json: () => Promise.resolve()
    });
    await expect(getMe()).rejects.toThrow('authentication failed');
  });
});
