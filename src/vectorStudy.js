import {vector} from "./Vector.js";

let canvas = document.getElementById("my-canvas");
let cContext = canvas.getContext("2d");
console.log(cContext)
let spheres = [];
let radius = 10;
const velocity = 0.0007;

const Sphere = function (nx, ny, vel, ncolor, nvector) {
    let x = nx;
    let y = ny;
    console.log(x, y);
    let velocity = vel;
    let color = ncolor;
    let vector = nvector;
    return {
        getCordinates: () => [x, y],
        getVelocity: () => velocity,
        setCordinate: (nCord) => [x, y] = nCord,
        getColor: () => color,
        getVector: () => vector
    }
}

function drawSphere(s) {
    let [x, y] = s.getCordinates()
    console.log("draw")
    cContext.beginPath();
    console.log({x,y}, "-----")
    cContext.arc(x, y, radius, 0, Math.PI * 2)
    cContext.fillStyle = s.getColor();
    cContext.fill();
    cContext.closePath();
}

function move(objs , velocity) {
    console.log("move")
    for (let i = 0; i < objs.length; i++) {
        console.log(objs[i])
        let [startX, startY] = objs[i].getVector().getStartPos();
        let [finalX, finalY] = objs[i].getVector().getEndPos();
        let [actualX, actualY] = objs[i].getCordinates();
        let newCordinates = [actualX + (finalX - startX) * velocity,actualY + (finalY - startY) * velocity]
        objs[i].setCordinate(newCordinates);
    }
}
function render() {
    console.log("render")
    cContext.clearRect(0, 0, canvas.width, canvas.height);
    console.log("render");
    spheres.forEach(s=>{
        drawSphere(s)
    });
    
}

let vec = new vector([canvas.width /2,canvas.height/2],[canvas.width + 1000 , canvas.height/2 - 1000]);
console.log(vec)
let s = new Sphere(canvas.width / 2, canvas.height / 2, 1, "#0095DD",vec );
spheres.push(s)
console.log(s.getCordinates());
// drawSphere(s)
 
// setInterval(()=>{
//     move(spheres ,velocity)
// },10)

// setInterval(()=>{
//     render()
// }, 12)