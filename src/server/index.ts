import http, { createServer } from 'http'
import SocketService from './services/socket.js';
SocketService
async function init() {

    const socketService = new SocketService();

    const httpServer = createServer();
    const PORT = process.env.PORT ? process.env.PORT : 8000 ; 

    socketService.io.attach(httpServer);

    socketService.initListener();

    httpServer.listen(PORT,()=>{
        console.log(`server listen at http://localhost:${PORT}`)
    });
}

init();