import { v4 as uuidv4 } from 'uuid';

const DEVICE_KEY = 'device_id';

export const createDeviceId = () => {
  const id = uuidv4();
  localStorage.setItem(DEVICE_KEY, id);
  return id;
};

export const getDeviceId = () => {
  return localStorage.getItem(DEVICE_KEY);
};

export const removeDeviceId = () => {
  localStorage.removeItem(DEVICE_KEY);
};