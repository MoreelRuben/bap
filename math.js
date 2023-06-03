module.exports.SUM =  function SUM(arr){
    let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}


module.exports.AVG =  function AVG(arr){
    let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  const average = sum / arr.length;
  return average;
}


module.exports.TAN =  function AVG(degrees){
    const tangent = Math.tan(degrees);
    return tangent
}

module.exports.SQRT = function SQRT(number){
    const squareRoot = Math.sqrt(number);
    return squareRoot
}


module.exports.AVERAGEIFS = function AVERAGEIFS(range, conditionValue, conditionRange) {
    let sum = 0;
    let count = 0;
  
    for (let i = 0; i < range.length; i++) {
      const condition = conditionRange[i];
  
      if (condition === conditionValue) {
        sum += range[i];
        count++;
      }
    }
  
    if (count === 0) {
      return 0; // To avoid division by zero
    }
  
    return sum / count;
  }