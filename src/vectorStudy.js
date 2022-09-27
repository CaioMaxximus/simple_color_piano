import { vector } from "./Vector.js";

let canvas = document.getElementById("my-canvas");
let cContext = canvas.getContext("2d");
console.log(cContext)
let spheres = [];
let radius = 10;
const velocity = 0.01;

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

function drawVectors(s) {

    let [xi, yi] = s.getCordinates();
    let [xf, yf] = s.getVector().getEndPos();
    cContext.beginPath();
    cContext.moveTo(xi, yi);
    cContext.lineTo(xf, yf);
    cContext.fillStyle = s.getColor();
    cContext.stroke();
    cContext.closePath();

}

function move(objs, velocity) {
    console.log("move")
    for (let i = 0; i < objs.length; i++) {
        // console.log(objs[i])
        let [startX, startY] = objs[i].getVector().getStartPos();
        let [finalX, finalY] = objs[i].getVector().getEndPos();
        let [actualX, actualY] = objs[i].getCordinates();
        let newCordinates = [actualX + (finalX - startX) * velocity / 2, actualY + (finalY - startY) * velocity / 2]
        objs[i].setCordinate(newCordinates);
    }
}
function render() {
    cContext.clearRect(0, 0, canvas.width, canvas.height);
    spheres.forEach(s => {
        drawSphere(s)
        drawVectors(s);
    });

}

function detectColision(sphereA, sphereB) {

    let [x1, y1] = sphereA.getCordinates();
    let [x2, y2] = sphereB.getCordinates()
    console.log([x1, y1], [x2, y2])
    console.log((x1 - x2) < 5)
    if (Math.abs(x1 - x2) < 18 && Math.abs(y1 - y2) < 18) {
        console.log("colide")
        // alert(sphereA.getCordinates() , sphereB.getCordinates())
        return true;
    }


    return false;
}

function normailzeCodinates(x, y) {


    let hipo = Math.sqrt((x * x) + (y * y))


    let multiFactor = 1;
    let newHip = hipo;
    while (Math.abs(newHip) < 1) {
        newHip = newHip * 10
        multiFactor *= 10;
    }

    return [x * multiFactor / newHip, y * multiFactor / newHip]

}


function findAngleComplement(x, y) {



    if (x < 0 && y >= 0) {
        return Math.PI
    } if (x < 0 && y < 0) {
        return Math.PI
    }
    if (x >= 0 && y < 0) {
        return 2 * Math.PI
    }
    return 0
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
    let phiCalc = Math.atan(normalN[1] / normalN[0]) + findAngleComplement(normalN[0], normalN[1])
    // let phi = phiCalc >= Math.PI ? phiCalc - Math.PI : phiCalc
    let phi = phiCalc

    //get normalized vectors starting at origin
    // let v1N = [(v1.getEndPos()[0] - v1.getStartPos()[0]) / v1Len,
    // (v1.getEndPos()[1] - v1.getStartPos()[1]) / v1Len]

    // let v2N = [(v2.getEndPos()[0] - v2.getStartPos()[0]) / v2Len,
    // (v2.getEndPos()[1] - v2.getStartPos()[1]) / v2Len]


    ///temporaly dont normalize vectors

    let v1N = [(v1.getEndPos()[0] - v1.getStartPos()[0]), (v1.getEndPos()[1] - v1.getStartPos()[1])]
    let v2N = [(v2.getEndPos()[0] - v2.getStartPos()[0]), (v2.getEndPos()[1] - v2.getStartPos()[1])]

    //get angles from the vectors
    let acosV1 = Math.atan(v1N[1] / v1N[0]) + findAngleComplement(v1N[0], v1N[1]);
    let acosV2 = Math.atan(v2N[1] / v2N[0]) + findAngleComplement(v2N[0], v2N[1]);
    // let teta1 = acosV1 >= Math.PI ? acosV1 - Math.PI : acosV1
    // let teta2 = acosV2 >= Math.PI ? acosV2 - Math.PI : acosV2

    let teta1 = acosV1
    let teta2 = acosV2

    let m1 = 1;
    let m2 = 1;
    let v_1 = 1;
    let v_2 = 1;
    //starting equations
    // for while using global velocity
    let v1EP1 = (v_1 * Math.cos(teta1 - phi) * (m1 - m2) + (2 * m2 * v_2 * Math.cos(teta2 - phi))) / (m1 + m2);
    let v2EP2 = (v_2 * Math.cos(teta2 - phi) *
        (m2 - m1) + (2 * m1 * v_1 * Math.cos(teta1 - phi))) / (m1 + m2);


    ///same mass(1) and same velocity guide to same force for while

    let vf = velocity;
    let phiPlusPi = phi + Math.PI / 2

    /// ignoring masses; maybe change after

    let v1FX = v1EP1 * Math.cos(phi) + v_1 * Math.sin(teta1 - phi) * Math.cos(phiPlusPi);
    let v1FY = v1EP1 * Math.sin(phi) + v_1 * Math.sin(teta1 - phi) * Math.sin(phiPlusPi);
    let v2FX = v2EP2 * Math.cos(phi) + v_2 * Math.sin(teta2 - phi) * Math.cos(phiPlusPi);
    let v2FY = v2EP2 * Math.sin(phi) + v_2 * Math.sin(teta2 - phi) * Math.sin(phiPlusPi);


    let hipo1 = Math.sqrt((v1FX * v1FX) + (v1FY * v1FY))
    let hipo2 = Math.sqrt((v2FX * v2FX) + (v2FY * v2FY))


    let [newCordNX1, newCordNY1] = normailzeCodinates(v1FX, v1FY)
    let [newCordNX2, newCordNY2] = normailzeCodinates(v2FX, v2FY)


    let size = 1000

    let angleV1 = Math.acos(v1FX / hipo1)
    let [newXV1, newYV1] = [sphereA.getCordinates()[0] + newCordNX1 * size, sphereA.getCordinates()[1] + newCordNY1 * size]
    ///testing


    let angleV2 = Math.acos(v2FX / hipo2)

    let [newXV2, newYV2] = [sphereB.getCordinates()[0] + newCordNX2 * size, sphereB.getCordinates()[1] + newCordNY2 * size]
    let newH = Math.sqrt(((newXV2 - x2) ** 2) + ((newYV2 - y2) ** 2))

    let angleT = Math.acos((newXV2 - x2) / newH)

    // sphereA.getVector().setVector(sphereA.getCordinates(),
    //     [(sphereA.getCordinates()[0] + v1FX) + 100, (sphereA.getCordinates()[1] + v1FY) + 100])
    // sphereB.getVector().setVector(sphereB.getCordinates(),
    //     [(sphereB.getCordinates()[0] + v2FX) + 100,
    //     (sphereB.getCordinates()[0] + v2FY) + 100])


    sphereA.getVector().setVector(sphereA.getCordinates(),
        [newXV1, newYV1])
    sphereB.getVector().setVector(sphereB.getCordinates(),
        [newXV2, newYV2])

    //  while (detectColision(sphereA, sphereB)) {
    //      move([sphereA, sphereB], velocity)

    //  }

    console.log(sphereA.getVector().getStartPos(),
        sphereA.getVector().getEndPos(),
        sphereB.getVector().getStartPos(),
        sphereB.getVector().getEndPos());


}

function physicsProcess() {
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
let vec1 = new vector([canvas.width / 2 - 100, canvas.height / 2 + 15], [(canvas.width / 2), (canvas.height / 2)]);
let vec2 = new vector([(canvas.width / 2), (canvas.height / 2)], [canvas.width / 2 - 100, canvas.height / 2]);
let s1 = new Sphere(canvas.width / 2 - 100, (canvas.height / 2) + 15, 1, "#ff0000", vec1);
let s2 = new Sphere((canvas.width / 2), (canvas.height / 2), 1, "#0005DD", vec2);


let vec3 = new vector([canvas.width / 2 - 90, canvas.height / 2 + 40], [(canvas.width / 2), (canvas.height / 2)]);
let vec4 = new vector([(canvas.width / 2) + 25, (canvas.height / 2)], [canvas.width / 2 - 100, canvas.height / 2 + 40]);
let s3 = new Sphere(canvas.width / 2 - 90, (canvas.height / 2) + 40, 1, "#ff9000", vec3);
let s4 = new Sphere((canvas.width / 2) + 25, (canvas.height / 2), 1, "#0007FD", vec4);



let vec5 = new vector([canvas.width / 2 - 70, canvas.height / 2 + 40], [(canvas.width / 2), (canvas.height / 2)]);
let vec6 = new vector([(canvas.width / 2) + 30, (canvas.height / 2) - 10], [canvas.width / 2 - 100, canvas.height / 2 + 40]);
let s5 = new Sphere(canvas.width / 2 - 70, (canvas.height / 2) + 40, 1, "#f19000", vec5);
let s6 = new Sphere((canvas.width / 2) + 30, (canvas.height / 2) - 10, 1, "#0003FD", vec6);

spheres.push(s1)
spheres.push(s2)
spheres.push(s3)
spheres.push(s4)
spheres.push(s5)
spheres.push(s6)

// render(spheres)

setInterval(() => {
    step()
}, 100)
setInterval(() => {
    render()
}, 12)


// let sT = new Sphere(10,  1,1 , "#ff0000", new vector )
// spheres.push(sT)
// render()
