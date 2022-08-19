import {queue} from "./../Queue.js"

const fila = new queue(2); 

console.log("================ TESTS LOG =============")

console.log("1",fila.getSize() === 0 )
console.log("2",fila.getQueue())
console.log("3",fila.dequeue() === "")

fila.enqueue(1)
fila.enqueue(2)
fila.enqueue(3)
fila.enqueue(4)
fila.enqueue(5)

console.log("4",fila.getSize() === 2)
console.log("5",fila.getQueue())
