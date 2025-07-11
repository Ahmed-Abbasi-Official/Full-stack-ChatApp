import { Server } from 'socket.io'

class SocketService {
    private _io: Server;
    constructor() {
        console.log("Init socket services")
        this._io = new Server({
            cors:{
                allowedHeaders:['*'],
                origin:'*'
            }
        });
    };

    public initListener() {
        const io = this.io;
        console.log("Run hu rha hy")
        io.on('connection', (socket) => {
            console.log('a user connected',socket.id);
            socket.on("event:message",async({message}:{message:string})=>{
                console.log("New Message",message);
            })
        });

        
    }

    get io() {
        return this._io;
    }
};

export default SocketService;