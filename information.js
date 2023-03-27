module.exports.ISBINARY = function ISBINARY(cell){
    cell = parseInt(cell);

    if(cell == 0 || cell == 1){
        return true
    }else{
        return false
    }
}


module.exports.ISBLANK = function ISBLANK(cell){
    if(cell == ""){
        return true
    }else{
        return false
    }
}

