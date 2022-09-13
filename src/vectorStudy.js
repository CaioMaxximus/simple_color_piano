import { vector } from "./Vector.js";

let canvas = document.getElementById("my-canvas");
let cContext = canvas.getContext("2d");
console.log(cContext)
let spheres = [];
let radius = 10;
const velocity = 0.009;

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
    // console.log("draw")
    cContext.beginPath();
    // console.log({x,y}, "-----")
    cContext.arc(x, y, radius, 0, Math.PI * 2)
    cContext.fillStyle = s.getColor();
    cContext.fill();
    cContext.closePath();
}

function move(objs, velocity) {
    console.log("move")
    for (let i = 0; i < objs.length; i++) {
        // console.log(objs[i])
        let [startX, startY] = objs[i].getVector().getStartPos();
        let [finalX, finalY] = objs[i].getVector().getEndPos();
        let [actualX, actualY] = objs[i].getCordinates();
        let newCordinates = [actualX + (finalX - startX) * velocity, actualY + (finalY - startY) * velocity]
        objs[i].setCordinate(newCordinates);
    }
}
function render() {
    cContext.clearRect(0, 0, canvas.width, canvas.height);
    spheres.forEach(s => {
        drawSphere(s)
    });

}

function detectColision(sphereA, sphereB) {

    let [x1, y1] = sphereA.getCordinates();
    let [x2, y2] = sphereB.getCordinates()
    console.log([x1, y1], [x2, y2])
    console.log((x1 - x2) < 5)
    if (Math.abs(x1 - x2) < 20 && Math.abs(y1 - y2) < 20    ) {
        console.log("colide")
            // alert(sphereA.getCordinates() , sphereB.getCordinates())
        return true;
    }


    return false;
}

function calculateDeflection(sphereA, sphereB) {

    let [x1, y1] = sphereA.getCordinates();
    let [x2, y2] = sphereB.getCordinates();
    let [v1, v2] = [sphereA.getVector(), sphereB.getVector()];
    let [v1Len, v2Len] = [v1.getLength(), v2.getLength()]

    //get normal vector of the colison normalized
    let [normalX, normalY] = [x2 - x1, y2 - y1];
    let normalLen = Math.sqrt(normalX ** 2 + normalY ** 2);
    let normalN = [(x2 - x1) / normalLen, (y2 - y1) / normalLen];
    //get normal  vector angle
    let phiCalc = Math.acos(normalN[0])
    let phi = phiCalc >= Math.PI ? phiCalc - Math.PI : phiCalc

    //get normalized vectors starting at origin
    let v1N = [(v1.getEndPos()[0] - v1.getStartPos()[0]) / v1Len,
    (v1.getEndPos()[1] - v1.getStartPos()[1]) / v1Len]

    let v2N = [(v2.getEndPos()[0] - v2.getStartPos()[0]) / v2Len,
    (v2.getEndPos()[1] - v2.getStartPos()[1]) / v2Len]

    //get angles from the vectors
    let acosV1 = Math.acos(v1N[0]);
    let acosV2 = Math.acos(v2N[0]);
    // let teta1 =  acosV1 >= Math.PI ?acosV1 - Math.PI : acosV1
    // let teta2 =  acosV2 >= Math.PI ?acosV2 - Math.PI : acosV2

    let teta1 = acosV1

    let teta2 = acosV2
    //starting equations
    // for while using global velocity
    let v1XR = velocity * Math.cos(teta1 - phi);
    let v1YR = velocity * Math.sin(teta1 - phi);
    let v2XR = velocity * Math.cos(teta2 - phi);
    let v2YR = velocity * Math.sin(teta2 - phi);

    ///same mass(1) and same velocity guide to same force for while

    let vf = velocity;
    let phiPlusPi = phi + Math.PI / 2

    /// ignoring masses; maybe change after

    let v1FX = ((2 * v2XR) / 2) * Math.cos(phi) + v1YR * Math.cos(phiPlusPi);
    let v1FY = ((2 * v2XR) / 2) * Math.sin(phi) + v1YR * Math.sin(phiPlusPi);
    let v2FX = ((2 * v1XR) / 2) * Math.cos(phi) + v2YR * Math.cos(phiPlusPi);
    let v2FY = ((2 * v1XR) / 2) * Math.sin(phi) + v2YR * Math.sin(phiPlusPi);

    sphereA.getVector().setVector(sphereA.getCordinates(), 
    [v1FX + sphereA.getVector().getStartPos()[0] , v1FY + 
    sphereA.getVector().getStartPos()[1]])
    sphereB.getVector().setVector(sphereB.getCordinates(),
     [ v2FX +  sphereB.getVector().getStartPos()[0] , v2FY + 
    sphereB.getVector().getStartPos()[1]])

    console.log(v1FX,
        v1FY, 
        v2FX,
        v2FY,);
}


function step() {

    for (let i = 0; i < spheres.length; i++) {

        for (let j = i + 1; j < spheres.length; j++) {
            let sphereA = spheres[i]
            let sphereB = spheres[j]
            // console.log("step")
            if (detectColision(sphereA, sphereB)) {
                calculateDeflection(sphereA, sphereB);
            }

        }
    }
    move(spheres, velocity);

}
let vec1 = new vector([canvas.width / 2 - 100, canvas.height / 2], [canvas.width / 2 + 100, canvas.height / 2]);
let vec2 = new vector([canvas.width / 2 + 100, canvas.height / 2], [canvas.width / 2 - 100, canvas.height / 2]);
let s1 = new Sphere(canvas.width / 2 - 100, canvas.height / 2, 1, "#0095DD", vec1);
let s2 = new Sphere(canvas.width / 2 + 100, canvas.height / 2, 1, "#0005DD", vec2);


spheres.push(s1)
spheres.push(s2)



// // drawSphere(s)

setInterval(() => {
    step()
}, 10)

setInterval(() => {
    render()
}, 12)