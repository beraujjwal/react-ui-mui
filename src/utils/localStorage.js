const ACCESS_TOKEN_KEY = 'accessToken';
const USER_KEY = 'user';

export const persistToken = (token) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(token));
};

export const readToken = () => {
  let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  if(accessToken === 'null') return null;
  if(accessToken === 'undefined') return null;
  if(accessToken) accessToken =  JSON.parse(accessToken);
  return accessToken?.accessToken;
};

export const persistUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const readUser = () => {
  let user = localStorage.getItem(USER_KEY);
  if(user) user =  JSON.parse(user);
  return user;
};

export const deleteToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);
export const deleteUser = () => localStorage.removeItem('user');
