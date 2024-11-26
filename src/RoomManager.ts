import { SimpleWebSocket } from "./SimpleWebSocket";
import { EventEmitter } from "./EventEmitter";

export class RoomManager extends EventEmitter{
  private rooms : Map<string,Set<SimpleWebSocket>> = new Map();
  
  joinRoom(roomName:string,socket:SimpleWebSocket):void{
    if(!this.rooms.has(roomName)){
        this.rooms.set(roomName,new Set());
    }
    this.rooms.get(roomName)?.add(socket);
    this.emit("joinRoom",roomName,socket);
  }

  leaveRoom(roomName:string,socket:SimpleWebSocket):void{
    this.rooms.get(roomName)?.delete(socket);
    if(this.rooms.get(roomName)?.size===0){
        this.rooms.delete(roomName);
    }
    this.emit("leaveRoom",roomName,socket);
  }

  broadcastToRoom(roomName:string,eventName:string,data:any):void{
    const message = JSON.stringify({type:eventName,payload:data});
    this.rooms.get(roomName)?.forEach(socket=>{
        socket.send(eventName,data);
    })
    this.emit("broadcast",roomName,eventName,data);
  }

}