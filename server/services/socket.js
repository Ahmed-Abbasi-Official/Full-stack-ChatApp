import { createAdapter } from '@socket.io/redis-adapter';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
// یا
import Redis from 'ioredis';
dotenv.config();

const pub = new Redis({ host: "redis", port: 6379 });
const sub = pub.duplicate();

const serverName = process.env.SERVER_ID || 'unknown-server';

class SocketService {
  _io;
  
  constructor() {
    console.log('Initializing socket service');


this._io = new Server({
  adapter:createAdapter(pub, sub),
  cors: {
    origin: "*",
  },
});

    // Attach Redis Adapter for scaling

    // Redis pub/sub for cross-instance broadcasting (optional if you're using adapter already)
    // sub.subscribe('MESSAGES');
  }

  initListener() {
    const io = this._io;

    console.log('Socket listener running');

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      // Room registration (used to send message to specific user)
      socket.on('event:register', ({ userId }) => {
        socket.join(userId); // Now user is in a room named by their ID
        console.log(`${userId} joined their room`);
      });

      // Send message to a specific user using their room
      socket.on('event:message', async ({ toUserId, message }) => {
        console.log(`Message sent to ${toUserId}:`, message);
        console.log(toUserId)

        // Emit to a specific room  
        io.to(toUserId).emit('message', {
          from: socket.id,
          message,
          serverName
        });

        // Optional: also broadcast across instances via Redis pub/sub
        // await pub.publish('MESSAGES', JSON.stringify({ toUserId, message }));
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    // Redis cross-instance broadcasting
    // sub.on('message', (channel, payload) => {
    //   if (channel === 'MESSAGES') {
    //     const { toUserId, message } = JSON.parse(payload);
    //     console.log("Server ID : ",serverName)
    //     io.to(toUserId).emit('message', {
    //       from: 'server-broadcast',
    //       message, 
    //       serverName
    //     });
    //   }
    // });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
