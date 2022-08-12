import {notes} from "./notes_loader.js" ;

const keys_enum ={
    "a": "c",
    "s": "d" ,
    "d": "e" ,
    "f": "f" ,
    "g": "g" ,
    "h": "a" ,
    "j": "b" ,
}
function keyPressed(evt) {
    evt = evt || window.event;
    let key = evt.keyCode || evt.wich;
    return String.fromCharCode(key);
}


function changeKeyDOMColor(elem , color){
    elem.style.backgroundColor = color;
}


function handleKeys(key){
    let keyF = key.toLowerCase();
    console.log(keyF);
    try{
        //origianl object
        let key_name = keys_enum[keyF];
        let audio = notes[key_name] 
        //copying allows to play various at same tiame
        let newAudio =audio.cloneNode();
        console.log(newAudio)
        newAudio.play()
        let $key = document.getElementById(`key-${key_name}`);
        console.log($key);
        let originalKeyColor = $key.style.backgroundColor;
        setTimeout( () => changeKeyDOMColor($key ,originalKeyColor)
        ,100);
        changeKeyDOMColor($key, "rgb(179, 168, 119)");
    }catch (error){
        console.log(error)
    }
}

document.onkeypress = (event) =>{
    console.log("chamou!!!")
    let key = keyPressed(event);
    handleKeys(key);
}