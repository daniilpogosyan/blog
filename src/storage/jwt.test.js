import { getJWT, setJWT, removeJWT } from './jwt';
import { getStorage } from './utils.js';

describe('manage jwt', () => {
  const storage = getStorage();

  // Create side item to make sure, that handling jwt
  // does not affect other items in the storage.
  // Probably, it should be removed as it possibly a bad practice.
  const sideItemKey = 'KEY of a not related item';
  const sideItemValue = 'VALUE of a not related item';

  beforeEach(() => {
    storage.clear();
    storage.setItem(sideItemKey,sideItemValue);
  })

  afterEach(() => {
    expect(storage.getItem(sideItemKey)).toBe(sideItemValue)
  })


  test('no jwt exists, get jwt', () => {
    expect(getJWT()).toBe(null);
  });

  test('set, get', () => {
    const mockToken = 'abc1234';
    setJWT(mockToken);
    expect(getJWT()).toBe(mockToken);
  });

  test('no jwt exists, get jwt (make sure that there is no jwt in storate between test', () => {
    expect(getJWT()).toBe(null);
  });

  test('set, overwrite, get', () => {
    const firstMockToken = 'abc1234';
    setJWT(firstMockToken);

    const secondMockToken = 'efg5678';
    setJWT(secondMockToken);

    expect(getJWT()).toBe(secondMockToken);
  });


  test('set, remove, get', () => {
    setJWT('jwt-to-bo-deleted');
    removeJWT();
    expect(getJWT()).toBe(null);
  });

  test('set, overwrite, remove, get', () => {
    setJWT('firstjwt');
    setJWT('secondjwt');
    removeJWT();
    expect(getJWT()).toBe(null);
  });
});
