import { RoomManager } from "./RoomManager";
import { SimpleWebSocket } from "./SimpleWebSocket";

export class WebSocketServer{
    private rooms = new RoomManager();

    heandleConnection(socket:WebSocket):void{
        const simpleSocket = new SimpleWebSocket(socket);

        simpleSocket.on("joinRoom",roomName=>{
            this.rooms.joinRoom(roomName,simpleSocket);
        });

        simpleSocket.on('leaveRoom',roomName=>{
            this.rooms.leaveRoom(roomName,simpleSocket);
        })

        simpleSocket.on('messageToRoom',({roomname,message})=>{
            this.rooms.broadcastToRoom(roomname,"roomMessage",message);
        })
    }
}