export class EventEmitter {
    private events: Record<string, ((...args: any[]) => void)[]> = {};

    on(eventName: string, callback: (...args: any[]) => void): void {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    emit(eventName:string,...args:any[]){
        if(this.events[eventName]){
            this.events[eventName].forEach((callback)=> callback(...args));
        }
    }

    off(eventName:string,callback:(...args:any[])=>void){
         if(this.events[eventName]){
            this.events[eventName] = this.events[eventName].filter((cb)=>cb!==callback);
         }
    }

    offAll(eventName:string){
        if(this.events[eventName]){
            this.events[eventName] = this.events[eventName].filter((cb)=>{false});
        }
    }
}
