//calcuate the difference between 2 dates 
module.exports.DATEDIF =  function DATEDIF(date1, date2, units){
try{
    date1 = new Date(date1)
    date2 = new Date(date2)
    var Difference_In_Time = date2.getTime() - date1.getTime();
    if(units == "Y"){
        var diff =(date2.getTime() - date1.getTime()) / 1000;
        diff /= (60 * 60 * 24);
        return Math.abs(Math.round(diff/365.25));

    }else if(units == "M"){
        return date2.getMonth() - date1.getMonth() + 
        (12 * (date2.getFullYear() - date1.getFullYear()))
    }else if(units == "D"){
        return Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
    }else{
        return null
    }
}catch(err){
    return "wrong date format"
}

}

// gives back a date based on day, month and year
module.exports.DATE =  function DATE(days, month, year){
    try{
        return new Date(`${month}/${days}/${year}`)
    }catch(err){
        return "wrong date format"
    }
}

// get day of date
module.exports.DAY =  function DAY(date){
    date = new Date(date);
    return date.getDay();
}

//get month of date
module.exports.MONTH =  function MONTH(date){
    date = new Date(date);
    return date.getMonth();
}

//get number of days between 2 dates
module.exports.DAYS = function DAYS(date1, date2){
    return DATEDIF(date1, date2, "D");
}

// add x months to date
module.exports.EDATE = function eDATE(date, months){
    date = new Date(date);

    Date.isLeapYear = function (year) { 
        return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
        };

    Date.getDaysInMonth = function (year, month) {
        return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    };

    Date.prototype.isLeapYear = function () { 
        return Date.isLeapYear(this.getFullYear()); 
    };

    Date.prototype.getDaysInMonth = function () { 
        return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
    };

    Date.prototype.addMonths = function (value) {
        var n = this.getDate();
        this.setDate(1);
        this.setMonth(this.getMonth() + value);
        this.setDate(Math.min(n, this.getDaysInMonth() + 1));
        return this;
    };

    return date.addMonths(months);

}

//last day of month, x months added to date
module.exports.EOMONTHS = function EOMONTHS(date, months){
    newMonth = eDATE(date, months)
    var month = newMonth.getMonth();
    var year = newMonth.getFullYear();
    return new Date(year, month + 1, 1);
}


module.exports.HOUR = function HOUR(time){
    let hour = time.split(":")[0]
    return parseInt(hour)
}


module.exports.MINUTE = function MINUTE(time){
    let minute = time.split(":")[1]
    return parseInt(minute)
}

module.exports.SECOND = function SECOND(time){
    let second = time.split(".")[1]
    return parseInt(second)
}

module.exports.ISOWEEKNUM = function ISOWEEKNUM(date){
    date = new DATE(date);
    return date.getWeek();
}

module.exports.networkdays = function NETWORKDAYS(startDate, endDate){

    if (endDate < startDate)
    return 0;
var millisecondsPerDay = 86400 * 1000;
startDate.setHours(0,0,0,1);  
endDate.setHours(23,59,59,999);  
var diff = endDate - startDate;  
var days = Math.ceil(diff / millisecondsPerDay);

var weeks = Math.floor(days / 7);
days = days - (weeks * 2);

var startDay = startDate.getDay();
var endDay = endDate.getDay();

if (startDay - endDay > 1)         
    days = days - 2;      

if (startDay == 0 && endDay != 6) {
    days = days - 1;  
}

if (endDay == 6 && startDay != 0) {
    days = days - 1;
}
return days;

}


module.exports.NOW = function NOW(){
    return new Date()
}


module.exports.TIME = function TIME(hours, minutes, seconds){
    numberOfSeconds = hours *3600 + minutes *60 + seconds
    return numberOfSeconds / 86400
}

module.exports.TIMEVALUE = function TIMEVALUE(string){
    return TIME(HOUR(string), MINUTE(string), SECOND(string))
}

module.exports.TODAY = function TODAY(){
    let nowDate = NOW();
    return nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate(); 
}


module.exports.WEEKDAY = function WEEKDAY(date){
    date = new Date(date);
    return date.getDay();
}

module.exports.YEAR = function YEAR(date){
    date = new Date(date);
    return date.getFullYear();
}

module.exports.YEARFRAC = function YEARFRAC(date1, date2){
    let days = DATEDIF(date1, date2, "D")
    return days / 365
}