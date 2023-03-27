class Workbook{

    constructor(name){
        this.name = name;
        this.worksheets = []
    }

    



    addWorksheet(){
        this.worksheets.push(new Worksheet())
    }
}