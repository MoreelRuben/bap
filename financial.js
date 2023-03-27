module.exports.CUMIPMT =  function CUMIPMT(rate, nper, pv, start_period, end_period, type) {
  try{
    if (rate <= 0 || nper <= 0 || pv <= 0) {
      return error.num
    }
  
    if (start_period < 1 || end_period < 1 || start_period > end_period) {
      return error.num
    }
  
    if (type !== 0 && type !== 1) {
      return error.num
    }
  
    const payment = PMT(rate, nper, pv, 0, type)
    let interest = 0
  
    if (start_period === 1) {
      if (type === 0) {
        interest = -pv
      }
  
      start_period++
    }
  
    for (let i = start_period; i <= end_period; i++) {
      interest += type === 1 ? FV(rate, i - 2, payment, pv, 1) - payment : FV(rate, i - 1, payment, pv, 0)
    }
  
    interest *= rate
  
    return interest
}catch(err){
    return "error"
}
  }