import { EventEmitter } from "../src/EventEmitter.ts";

Deno.test("EventEmitter can add a listener and trigger",()=>{
  const emitter = new EventEmitter();
  let result:number = 0;
  
  emitter.on('increase',(value:number)=>{
    result += value;
  })

  emitter.emit("increase",5);

  if(result!==5){
    throw new Error(`expected 5 but result is : ${result}`);
  }
})


Deno.test("EventEmitter can trigger more than one listener",()=>{
    const emitter = new EventEmitter();
    let result:number = 0 ;

    emitter.on("update",(value:number)=>{
        result += value;
    })

    emitter.on("update",(value:number)=> {
        result*=value;
    })

    emitter.emit('update',2);

    if(result!==4){
        throw new Error(`expected 4 but result : ${result}`)
    }
})


Deno.test("EventEmitter can delete one listener ",()=>{
const emitter = new EventEmitter();
let result:number = 3;

const add = (value:number)=>{result+=value};
const multiple = (value:number)=>{result*=value};

emitter.on('test',add);
emitter.on('test',multiple);
emitter.off('test',multiple);

emitter.emit('test',5);

if(result!==8){
    throw new Error(`expected 8 but result : ${result}`);
}

})