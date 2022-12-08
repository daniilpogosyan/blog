import { getStorage } from "./utils";

const storage = getStorage();

export function setJWT(token) {
  try {
    storage.setItem('auth-token', token);
  } catch (err) {
    return false
  }

  return true;
}

export function getJWT() {
  try {
    return storage.getItem('auth-token');
  } catch (err) {
    return false
  }
}

export function removeJWT() {
  try {
    storage.removeItem('auth-token');
  } catch (err) {
    return false
  }
  
  return true;
}

export function getBearerToken() {
  const token = getJWT();
  if (token) {
    return `Bearer ${token}`;
  } 

  throw new Error('JWT not found');
}
