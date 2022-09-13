const vector = function(startPos , endPos){

    let start = startPos;
    let end = endPos;

    return {
        getStartPos : ()=>{
           return start;
        },
        getEndPos :()=>{
            return end;
        },
        getLength : ()=>{
            let [xi,yi] = start;
            let [xf , yf] = end;
            let a = xf - xi;
            let b = yf - yi;
            console.log("Length vector" , a , b)
            let h = Math.sqrt(a * a + b * b)
            return h;
        },
        setVector : (startP ,endP)=>{
            start = startP;
            end = endP;
        }
    }
}

export  {vector};