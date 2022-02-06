/**
 * Counts the number of "Clock In" entries for the given employee
 * 
 * @param {E2} employeeDisplayName the employee name to count
 * @return {Number} the number of times this employee clocked in
 * @customfunction
 */
function getClockIns(employeeDisplayName) {
  Logger.log("counting clockin for " + employeeDisplayName)
  // get the data in processed data
  const SS = SpreadsheetApp.getActiveSpreadsheet()
  let processedData = SS.getSheetByName("Processed Data").getDataRange().getValues()

  // filter to only those with the employeeDisplayName
  let employeeData = processedData.filter(x => x[dataMap.displayName] == employeeDisplayName)
  // filter to only those clocked in
  let clockInData = employeeData.filter(x => x[dataMap.action] == CLOCKING_CHOICES[0])

  // return length
  Logger.log(clockInData.length)
  return clockInData.length
}

/**
 * Counts the number of "Clock Out" entries for the given employee
 * 
 * @param {E2} employeeDisplayName the employee name to count
 * @return {Number} the number of times this employee clocked in
 * @customfunction
 */
function getClockOuts(employeeDisplayName) {
  Logger.log("counting clockout for " + employeeDisplayName)
  // get the data in processed data
  const SS = SpreadsheetApp.getActiveSpreadsheet()
  let processedData = SS.getSheetByName("Processed Data").getDataRange().getValues()

  // filter to only those with the employeeDisplayName
  let employeeData = processedData.filter(x => x[dataMap.displayName] == employeeDisplayName)
  // filter to only those clocked in
  let clockInData = employeeData.filter(x => x[dataMap.action] == CLOCKING_CHOICES[1])
  // return length
  return clockInData.length
}

/**
 * Finds the job that the employee is currently clocked in for
 * 
 * @param {E2} employeeDisplayName the target employee 
 * @return {String} the job name and number or "Off the Clock"
 * @customfunction
 */
function getCurrentJob(employeeDisplayName) {
  // get the data in processed data
  const SS = SpreadsheetApp.getActiveSpreadsheet()
  let processedData = SS.getSheetByName("Processed Data").getDataRange().getValues()

  // filter to only those with the employeeDisplayName
  let employeeData = processedData.filter(x => x[dataMap.displayName] == employeeDisplayName)

  // pop the latest entry
  let latestEntry = employeeData.pop()
  // if clocked in
  if (latestEntry[dataMap.action] == CLOCKING_CHOICES[0]) {
    return latestEntry[dataMap.displayJob]
  }
  else {
    return "Off the Clock"
  }
}

/**
 * Finds the task that the employee is currently clocked in for
 * 
 * @param {E2} employeeDisplayName the target employee 
 * @return {String} the task name or "Off the Clock"
 * @customfunction
 */
function getCurrentTask(employeeDisplayName) {
  // get the data in processed data
  const SS = SpreadsheetApp.getActiveSpreadsheet()
  let processedData = SS.getSheetByName("Processed Data").getDataRange().getValues()

  // filter to only those with the employeeDisplayName
  let employeeData = processedData.filter(x => x[dataMap.displayName] == employeeDisplayName)

  // pop the latest entry
  let latestEntry = employeeData.pop()
  // if clocked in
  if (latestEntry[dataMap.action] == CLOCKING_CHOICES[0]) {
    return latestEntry[dataMap.task]
  }
  else {
    return "Off the Clock"
  }
}
