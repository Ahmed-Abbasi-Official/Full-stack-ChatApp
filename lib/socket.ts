import { io } from 'socket.io-client';

const SOCKET_URL = process.env.NODE_ENV === 'production'
  ? 'https://yourdomain.com'
  : 'http://localhost:8080';

const socket = io(SOCKET_URL, {
  path: '/socket.io/',
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  withCredentials: true,
  autoConnect: true,
  query: {
    userId: typeof window !== 'undefined' ? localStorage.getItem('userId') : null
  }
});



export default socket;