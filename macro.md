Sub MeasureExecutionTime()
    Dim startTime As Double
    Dim endTime As Double
    Dim executionTime As Double

    ' Record the start time
    startTime = Timer
    
    ' Your Excel function or calculation here
    ' Replace "C8" with the cell reference where you want to place the formula
    Range("C8").Formula = "=VERT.ZOEKEN(B8;G3:K9996;5;ONWAAR)"

    ' Record the end time
    endTime = Timer
    
    ' Calculate the execution time in milliseconds
    executionTime = (endTime - startTime) * 1000

    ' Display the execution time in milliseconds
    MsgBox "Execution Time: " & executionTime & " milliseconds"
End Sub