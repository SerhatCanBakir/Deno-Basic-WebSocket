import { EventEmitter } from "./EventEmitter.ts";

export class SimpleWebSocket extends EventEmitter{
    private socket:WebSocket

    constructor(socket:WebSocket){
        super();
        this.socket=socket;

        this.socket.onmessage = (event)=>{
            const {type,payload} = JSON.parse(event.data)
            this.emit(type,payload)
        }

        this.socket.onopen = ()=> this.emit("open");
        this.socket.onclose = () => this.emit("close");
        this.socket.onerror = (err) => this.emit("error",err);
    }
  
    send(eventName:string,data:any):void{
        this.socket.send(JSON.stringify({type:eventName,payload:data}));
    }

    close():void{
        this.socket.close();
    }

}