module.exports.VLOOKUP = function VLOOKUP(searchValue, lookupTable, columnIndex) {
    const hashTable = {};
    for (let i = 0; i < lookupTable.length; i++) {
      hashTable[lookupTable[i][0]] = lookupTable[i][columnIndex];
    }
    if(hashTable[searchValue] == null){
      return 0
    }else{
    return hashTable[searchValue];
    }
  }


  module.exports.HLOOKUP =   function HLOOKUP(searchValue, lookupTable, rowIndex) {
    const hashTable = {};
    for (let i = 0; i < lookupTable[0].length; i++) {
      hashTable[lookupTable[0][i]] = lookupTable[rowIndex][i];
    }
    return hashTable[searchValue];
  }
  