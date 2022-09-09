const vector = function(startPos , endPos){

    let start = startPos;
    let end = endPos;

    return {
        getStartPos : ()=>{
           return start;
        },
        getEndPos :()=>{
            return end;
        }
    }
}

export  {vector};