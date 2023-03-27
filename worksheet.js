class Workbook{

    constructor(){
        this.cells= Array.from(Array(10000), () => new Array(10000))
    }

    

    getValueOnLocation(location){
        let coords = this.#lettersToNumberLocation(location)
        return this.cells[coords[0]][coords[1]] 

    }

    getValuesOfGroup(locationstart , locationend){

        let values = []
        locationstart = this.#lettersToNumberLocation(locationstart);
        locationend = this.#lettersToNumberLocation(locationend);

        for(var i=locationstart[0]; i <= locationend[0]; i++){

            for(var j=locationstart[1]; j <= locationend[1]; j++){
                values.push(this.cells[i][j])
            }
        }

        return values;

    }

    addValueToLocation(location, value){
        location = this.#lettersToNumberLocation(location)
        this.cells[location[0], location[1]] = value
    }



    #lettersToNumberLocation(location){
        let coords = []
        var answer = location;
        answer = answer.replace(/[0-9]/g, '');
        answer = answer.split("").reverse().join("")
        let number = 0
        for (var i = 0; i < answer.length; i++) {
            number = number + ((answer.charAt(i).charCodeAt() - 64)*(Math.pow(26, i)))
        }
        coords.push(number);

        var str = location;
        var res = str.replace(/\D/g, "");

        coords.push(res)

        return coords
    }
}



let workbook = new Workbook();

coords = workbook.getValuesOfGroup("A1", "B5")

console.log(coords)