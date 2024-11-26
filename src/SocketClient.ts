export class SocketClient {
   private socket:WebSocket; 
    private eventListener: Map<string,((data:any)=>void)[]>;
    
    constructor(private url:string){
        this.socket = new WebSocket(this.url);
        this.eventListener = new Map();
    
    
    this.socket.onopen = ()=>{
    this.emitEvent('open',null);
    }
    
    this.socket.onmessage = (event)=>{
    const data = this.parseMessage(event.data);
    this.emitEvent("message",data);
    }
    
    this.socket.onerror = (err)=>{
        this.emitEvent("error",err);
    }

    this.socket.onclose = ()=>{
        this.emitEvent("close",null);
    }
 } 
    
 public send(data:any):void{
    const message = this.formatMessage(data);
    this.socket.send(message);
 } 

 public on(event:string,callback:(data:any)=>void):void{
    if(!this.eventListener.has(event)){
        this.eventListener.set(event,[]);
    }
    this.eventListener.get(event)!.push(callback);
 }

    private formatMessage(data: any): string {
        return JSON.stringify(data);
      }

    private parseMessage(data: string): any {
        try {
          return JSON.parse(data);
        } catch {
          return data; 
        }
    }
    private emitEvent(event:string,data:any):void{
        const listener = this.eventListener.get(event) || [];
        listener.forEach(callback=>callback(data));
    }
}