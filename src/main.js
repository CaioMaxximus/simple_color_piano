import { notes } from "./notes_loader.js";
import { queue } from "./Queue.js";
import "./tests/QueueTest.js"

const firstKeyColor = "antiquewhite";
const secondKeyColor = "rgb(179, 168, 119)";
const bublesQueue = new queue(30)
const lifeTimeBuble = 100000;
let bubleCount = 20;

const keys_enum = {
    "a": "c",
    "s": "d",
    "d": "e",
    "f": "f",
    "g": "g",
    "h": "a",
    "j": "b",
}

let keys_free = {
    "c": true,
    "d": true,
    "e": true,
    "f": true,
    "g": true,
    "a": true,
    "b": true
} 

function dequeueBubles() {
    let index = bublesQueue.dequeue();
    removeBublesDOM(index);
}

function windEvent() {
    let style = document.documentElement.style;
    style.setProperty("--windQuantity", "500px");
    style.setProperty("--windVelocity", "6s");
    console.log("wind")
    // var animation{

    // }

    setTimeout(resetWind, 5000);
}

function resetWind() {

    let style = document.documentElement.style;
    style.setProperty("--windQuantity", "0px");
    style.setProperty("--windVelocity", "0s");
    console.log("reset")
}

function removeBublesDOM(index) {
    if (index !== "") {
        let buble = document.getElementById("buble-" + index)

        try {
            buble.parentElement.removeChild(buble);
        }
        catch {
            console.log(bublesQueue.getQueue());
        }
    }
}

function calculateBublePositon(key) {


    let $key = document.getElementById("key-" + key);
    // let $canvas = document.getElementById("canvas");
    // let canvasWidth = window.getComputedStyle($canvas, null).getPropertyValue("width");
    let margin = getOffset($key).left;
    console.log(margin);
    // let calc = 
    return margin;
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}


// function spawnBuble(leftMargin) {

//     let $buble = document.createElement("div");
//     $buble.className = "buble";
//     $buble.id = "buble-" + bubleCount;
//     let $innerBuble = document.createElement("div");
//     $innerBuble.className = "innerBuble";
//     $buble.appendChild($innerBuble);
//     let $innerBubleWind = document.createElement("div");
//     $innerBuble.appendChild($innerBubleWind)
//     $innerBubleWind.className = "innerBubleWind";


//     let canvasHeight = window.getComputedStyle(
//         document.getElementById("canvas"), null)
//         .getPropertyValue('height');

//     $buble.style.top = `${Number(canvasHeight.replace("px", "")) - 100}px`;
//     $buble.style.left = leftMargin + "px";
//     document.getElementById("canvas").appendChild($buble);
//     console.log(window.getComputedStyle($buble, null)
//         .getPropertyValue('top'))
// }


function spawnBuble(){
    bublesQueue.enqueue(new Buble());

}

function render(){

} 

function keyPressed(evt) {
    evt = evt || window.event;
    let key = evt.keyCode || evt.wich;
    return String.fromCharCode(key);
}
 

function changeKeyDOMColor(elem, color) {
    elem.style.backgroundColor = color;
}


function freeKeyUp(key) {
    let keyF = key.toLowerCase();
    console.log(keyF);
    try {
        //origianl object
        let key_name = keys_enum[keyF];
        keys_free[key_name] = true;
        let $key = document.getElementById(`key-${key_name}`);
        changeKeyDOMColor($key, firstKeyColor)


    } catch (error) {
        console.log(error);
    }
}

function handleKeys(key) {
    let keyF = key.toLowerCase();
    console.log(keyF);
    try {
        //origianl object
        let key_name = keys_enum[keyF];
        if (keys_free[key_name]) {
            keys_free[key_name] = false
            let audio = notes[key_name]
            //copying allows to play various at same tiame
            let newAudio = audio.cloneNode();
            console.log(newAudio)
            newAudio.play()
            let $key = document.getElementById(`key-${key_name}`);
            console.log($key);
            spawnBuble(calculateBublePositon(key_name));
            let ele = bublesQueue.enqueue(bubleCount);
            bubleCount += 1;
            if (ele !== "") {
                console.log(bublesQueue.getQueue());
                try {
                    removeBublesDOM(ele);
                }
                catch (error) {
                    console.log(error)
                }
            }
            changeKeyDOMColor($key, secondKeyColor);


        }
    } catch (error) {
        console.log(error)
    }
}

function randomValues(max, min) {
    return (Math.random() * (max - min + 1)) + min;

}
    
document.addEventListener("keyup", (event) => {
    console.log("levantou!!!")
    let key = keyPressed(event);
    freeKeyUp(key);
})

document.addEventListener("keypress", (event) => {
    console.log("chamou!!!")
    let key = keyPressed(event);
    handleKeys(key);
}) 

setInterval(dequeueBubles, lifeTimeBuble);
setTimeout(windEvent, randomValues(2000, 1000))
