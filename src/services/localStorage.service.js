import { v4 as uuidv4 } from 'uuid';

const DEVICE_KEY = 'device_id';
const ACCESS_TOKEN_KEY = 'accessToken';
const USER_KEY = 'user';

export const storeToken = (token) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(token));
};

export const readToken = () => {
  let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  if(accessToken === 'null') return null;
  if(accessToken === 'undefined') return null;
  if(accessToken) accessToken =  JSON.parse(accessToken);
  return accessToken;
};

export const readTokenOnly = () => {
  let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  if(accessToken === 'null') return null;
  if(accessToken === 'undefined') return null;
  if(accessToken) accessToken =  JSON.parse(accessToken);
  return accessToken?.accessToken;
};

export const storeUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const readUser = () => {
  let user = localStorage.getItem(USER_KEY);
  if(user) user =  JSON.parse(user);
  return user;
};

export const deleteToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);
export const deleteUser = () => localStorage.removeItem(USER_KEY);

export const storeDeviceId = () => {
  const id = uuidv4();
  localStorage.setItem(DEVICE_KEY, id);
  return id;
};

export const readDeviceId = () => {
  return localStorage.getItem(DEVICE_KEY);
};

export const removeDeviceId = () => {
  localStorage.removeItem(DEVICE_KEY);
};