<h1>Node.js Excel serverside module</h1>

<h2>Functionaliteit</h2>

Deze module bevat tal van functies, die overeenkomen met Excel functies.
Hierbij een lijst van alle functies die included zijn.

- DATEDIF(date1, date2, units): Calculates the difference between two dates in years, months, or days.
- DATE(days, month, year): Returns a date object based on the day, month, and year.
- DAY(date): Returns the day of the week for a given date.
- MONTH(date): Returns the month for a given date.
- DAYS(date1, date2): Returns the number of days between two dates.
- EDATE(date, months): Adds a specified number of months to a date.
- EOMONTHS(date, months): Returns the last day of the month after adding a specified number of months to a date.
- HOUR(time): Returns the hour component of a time string.
- MINUTE(time): Returns the minute component of a time string.
- SECOND(time): Returns the second component of a time string.
- ISOWEEKNUM(date): Returns the ISO week number for a given date.
- NETWORKDAYS(startDate, endDate): Returns the number of working days (excluding weekends) between two dates.
- NOW(): Returns the current date and time.
- TIME(hours, minutes, seconds): Converts a time specified in hours, minutes, and seconds to a decimal value.
- TIMEVALUE(string): Converts a time string to a decimal value.
- TODAY(): Returns the current date.
- WEEKDAY(date): Returns the day of the week for a given date.
- YEAR(date): Returns the year for a given date.
- YEARFRAC(date1, date2): Calculates the fraction of a year between two dates.
- CUMIPMT(rate, nper, pv, start_period, end_period, type): Calculates the cumulative interest paid on a loan over a specified period.
- ISBINARY(cell): Checks if a given cell value is a binary number (0 or 1). Returns true if the cell value is binary, and false otherwise.
- ISBLANK(cell): Checks if a given cell is blank (empty). Returns true if the cell is blank, and false otherwise.
- SUM(arr): Calculates the sum of all the numbers in an array.
- AVG(arr): Calculates the average of all the numbers in an array.
- TAN(degrees): Calculates the tangent of an angle given in degrees.
- SQRT(number): Calculates the square root of a given number.
- AVERAGEIFS(range, conditionValue, conditionRange): Calculates the average of a range of numbers based on multiple criteria.
- VLOOKUP(searchValue, lookupTable, columnIndex): Performs a vertical lookup in a table and returns a value based on a search value. It searches for the searchValue in the first column of the lookupTable and returns the corresponding value in the columnIndex.
- HLOOKUP(searchValue, lookupTable, rowIndex): Performs a horizontal lookup in a table and returns a value based on a search value. It searches for the searchValue in the first row of the lookupTable and returns the corresponding value in the rowIndex.


Daarnaast bevat de module ook een klasse Workbook die Worksheets kan aanmaken. En de klasse Worksheet die waarden kan opvragen, toevoegen, locatie van A1 --> [1][1] en excel bestanden kan inlezen.

Als laatste bevat de module ook een parser die Strings kan omzetten naar de juiste overeenkomstige formule.

Deze functie kunnen momenteel geparst worden:

- SUM
- AVG
- VLOOKUP
- SQRT
- TAN
- AVERAGEIFS

