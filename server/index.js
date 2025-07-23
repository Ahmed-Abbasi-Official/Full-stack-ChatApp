import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import SocketService from './services/socket.js';
import dotenv from 'dotenv';
// یا
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ 
  origin: true
}));

// Health check endpoint
app.get('/health', (req, res) => {
  const serverName = process.env.SERVER_ID || 'unknown-server';
  res.json({
    status: 'healthy',
    server: serverName,
    timestamp: new Date().toISOString()
  });
});

// Example HTTP route
app.get("/user", (req, res) => {
  const serverName = process.env.SERVER_ID || 'unknown-server';
  console.log(`[${serverName}] Request received at /user`);
  res.json({ 
    message: "Hello from user endpoint",
    server: serverName,
    timestamp: new Date().toISOString()
  });
});

async function init() {
  const serverName = process.env.SERVER_ID || 'unknown-server';
  console.log(`Initializing server: ${serverName}`);

  const httpServer = createServer(app);
  const PORT = process.env.PORT || 8000;

  const socketService = new SocketService();
  socketService.io.attach(httpServer);
  socketService.initListener();


  httpServer.listen(PORT, () => {
    console.log(`[${serverName}] Server listening on port ${PORT}`);
    console.log(`[${serverName}] Health check at http://localhost:${PORT}/health`);
  });
}

init();