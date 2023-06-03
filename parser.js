var Workbook = require('./workbook.js')
var Worksheet = require('./worksheet.js')
var math = require('./math.js')
var reference = require('./reference.js')

let workbook = new Workbook
workbook.addWorksheet()
let sheet = workbook.worksheets[0]
sheet.addValueToLocation("A1", 1)
sheet.addValueToLocation("A2", 2)
sheet.addValueToLocation("A3", 3)

function findExcelFunctions(str) {
  const regex = /(VLOOKUP|SUM|AVG|TAN|SQRT|AVERAGEIFS)\(([^()]+|\((?:[^()]+|\([^()]*\))*\))*\)/g;
  const functions = [];

  let match;
  while ((match = regex.exec(str))) {
    const functionName = match[1];
    const position = match.index;
    const innerStr = match[2];
    const endPosition = position + match[0].length - 1;

    const innerFunctions = findExcelFunctions(innerStr);

    functions.push({
      functionName,
      start: position,
      end: endPosition,
      innerFunctions,
    });
  }

  return functions;
}




function replaceExcelFunctions(str) {
  let evaluatedString = str;

  const foundFunctions = findExcelFunctions(str);
  for (let i = foundFunctions.length - 1; i >= 0; i--) {
    const { functionName, start, end, innerFunctions } = foundFunctions[i];
    const innerStr = str.substring(start, end + 1);

    let result = innerStr;
    let hasChilds = false
    let values = getStringFromParentheses(innerStr)
    let checkForChilds = findExcelFunctions(values)
    if(checkForChilds.length > 0){
      let result = replaceExcelFunctions(values)
      hasChilds = true
      values = result
    }
    let valueArray = [];
    if (functionName === 'VLOOKUP') {
      let params = getParts(values, ",")
      if(params.length > 3){
       throw new Error("to much params in vlookup");
      }
      let first = sheet.getValueOnLocation(params[0])
      let coords = getParts(params[1], ":")
      valueArray = sheet.getValuesOfGroup(coords[0], coords[1])
      result = reference.VLOOKUP(first, valueArray, parseInt(params[2]))

    } else if (functionName === "AVERAGEIFS") {
      let params = getParts(values, ",")
      if(params.length > 3){
       throw new Error("to much params in averageifs");
      }
      let second = sheet.getValueOnLocation(params[1])
      let coords1 = getParts(params[0], ":")
      valueArray = sheet.getValuesOfGroup(coords1[0], coords1[1])
      let coords2 = getParts(params[2], ":")
      let valueArray2 = sheet.getValuesOfGroup(coords2[0], coords2[1])
      result = math.AVERAGEIFS(valueArray, second, valueArray2)
    }
    else if (functionName === 'SUM') {
      if(hasChilds){
        throw new Error( "to much arguments")
      }
      let coords = getParts(values, ":")
      valueArray = sheet.getValuesOfGroup(coords[0], coords[1])
      result = math.SUM(valueArray);

    } else if (functionName === 'AVG') {
      if(hasChilds){
        throw new Error( "to much arguments")
      }
      let coords = getParts(values, ":")
      valueArray = sheet.getValuesOfGroup(coords[0], coords[1])
      result = math.AVG(valueArray);

    }else if (functionName === 'TAN') {
      if(hasChilds){
        throw new Error( "to much arguments")
      }
      parseCellReference(values)
      valueArray = sheet.getValueOnLocation(values)
      result = math.TAN(valueArray)

    }else if (functionName === 'SQRT') {
      if(hasChilds){
        throw new Error( "to much arguments")
      }
      parseCellReference(values)
      valueArray = sheet.getValueOnLocation(values)
      result = math.SQRT(valueArray)
    }

    evaluatedString = evaluatedString.substring(0, start) + result + evaluatedString.substring(end + 1);
  }

  return evaluatedString;
}




function getStringFromParentheses(inputString) {
  let start = 0
  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] === '(') {
      let start = i;
      return inputString.substring(start + 1, inputString.length -1)
    }
  }

  
}

function getParts(inputString, delimiter) {
  const parts = inputString.split(delimiter);
  return parts;
}


function parseCellReference(cellRef) {
  const regex = /^([A-Z]{1,3})(\d{1,3})$/;
  const matches = cellRef.match(regex);
  
  if (matches) {
    const column = matches[1];
    const row = parseInt(matches[2], 10);
    
    return { column, row };
  } else {
    throw new Error('Invalid cell reference');
  }
}








// Example usage:
const excelString = 'SUM(A1:A10) + AVG(B1:B5) * (VLOOKUP(C1,D1:E10,2) + SUM(A1:A5)) + SUM(A1:A2)';
const resultString = replaceExcelFunctions(excelString);
const result = eval(resultString);
console.log(result)

// Example usage:
const excelString2 = 'AVERAGEIFS(A1:A10,A2,A1:A5)';
const resultString2 = replaceExcelFunctions(excelString2);
const result2 = eval(resultString2);
console.log(result2)








  