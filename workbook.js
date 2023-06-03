let Worksheet = require('./worksheet')

class Workbook{

    constructor(name){
        this.name = name;
        this.worksheets = []
    }


    addWorksheet(){
        this.worksheets.push(new Worksheet)
    }

    getWorkSheet(){
        this.worksheets[0];
    }
}

module.exports = Workbook