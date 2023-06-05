const XLSX = require('xlsx');

class Worksheet{

    constructor(){
        this.cells= Array.from(Array(10000), () => new Array(10000))
    }

    

    getValueOnLocation(location){
        let coords = this.#lettersToNumberLocation(location)
        if(this.cells[coords[0]][coords[1]] == null){
            return 0
        }else{
        return this.cells[coords[0]][coords[1]] 
        }

    }

    getValuesOfGroup(locationstart , locationend){

        let values = []
        locationstart = this.#lettersToNumberLocation(locationstart);
        locationend = this.#lettersToNumberLocation(locationend);

        for(var i=locationstart[0]; i <= locationend[0]; i++){

            for(var j=locationstart[1]; j <= locationend[1]; j++){
                if(this.cells[i][j] !== undefined){
                    values.push(this.cells[i][j])
                }else{
                    values.push(0)
                }
            }
        }

        return values;

    }

    addValueToLocation(x, y, value){
        this.cells[x][y] = value
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
        res = parseInt(res)

        coords.push(res)

        return coords
    }


    readExcelFile(filePath){
        const workbook = XLSX.readFile(filePath);

        const sheetName = workbook.SheetNames[0];

        // Get the worksheet
        const worksheet = workbook.Sheets[sheetName];

        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const nestedArray = excelData.map(row => Object.values(row));

        let i = 0
        nestedArray.forEach(value => {
            let j = 0
            value.forEach(child => {
                this.addValueToLocation(i, j, child)
                j++
            })
            i++
        })


    }
}

module.exports = Worksheet