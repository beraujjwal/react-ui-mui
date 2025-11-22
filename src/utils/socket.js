import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3060';

// Create a single socket connection instance
export const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: false, // you can connect manually after login
});

export default socket;