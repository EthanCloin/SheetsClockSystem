/**
 * Things to consider here
 * Track Time In / Out with respect to a Job
 * 
 * Question 1: Who?
 * Question 2: Clock In/Out?
 * Question 3: Which Job?
 * 
 */

function createForm(){
  let form = FormApp.create("Clock System")
  // QUESTION ONE - Who?
  form.addMultipleChoiceItem()
      .setTitle("Your Name?")
      .setRequired(true)
  
  // QUESTION TWO - Clock In or Out
  form.addMultipleChoiceItem()
      .setTitle("Action?")
      .setChoiceValues(CLOCKING_CHOICES)
      .setRequired(true)

  // QUESTION THREE - Which Job
  form.addMultipleChoiceItem()
      .setTitle("Which Job?")
      .setRequired(true)
                    
  form.setCollectEmail(false)
  let responseSheetID = "1F_Vtrm_KyOfNAgfUAMr7NMp_Pwb-Oza-QH0YsHaf0Rc"
  form.setDestination(FormApp.DestinationType.SPREADSHEET, responseSheetID)
  Logger.log("Form Created!")
  
}

function updateFormValues() {
  const SS = SpreadsheetApp.getActiveSpreadsheet()
  let form = FormApp.openByUrl(SS.getFormUrl())
  let questions = form.getItems()

  // QUESTION ONE
    const employeeSheet = SS.getSheetByName("Employees")
    const employeeValues = employeeSheet.getRange(19, 1, employeeSheet.getLastRow()-1, employeeMap.role+1)
                                        .getValues()
    let employeeChoices = employeeValues.map(function(entry) {
      let name = entry[employeeMap.name]
      let role = entry[employeeMap.role]

      return name + " - " + role
    })

    let formattedEmployeeChoices = employeeChoices.filter(x => x != " - ")
    let employeeQuestion = questions[0]
    Logger.log(formattedEmployeeChoices)

    employeeQuestion.asMultipleChoiceItem()
                    .setChoiceValues(formattedEmployeeChoices)
                    .setRequired(true)
            
    Logger.log("Updated Q1 choices to: " + formattedEmployeeChoices.toString())

  // QUESTION TWO
    let clockQuestion = questions[1]
    clockQuestion.asMultipleChoiceItem()
              .setChoiceValues(CLOCKING_CHOICES)
              .setRequired(true)
    Logger.log("Updated Q2 choices to: " + CLOCKING_CHOICES)

  // QUESTION THREE
    // get job values from sheet
    const jobSheet = SS.getSheetByName("Jobs")
    let jobValues = jobSheet.getRange(2, 1, jobSheet.getLastRow()-1, jobSheet.getLastColumn()).getValues()
    let formattedJobChoices = jobValues.map(function(entry) {
      let lot = entry[jobMap.productionLot]
      let name = entry[jobMap.jobName]

      return name + " - " + lot
    })
    
    let jobQuestion = questions[2]
    jobQuestion.asMultipleChoiceItem()
        .setChoiceValues(formattedJobChoices)
        .setRequired(true)
    Logger.log("Updated Q3 choices to: " + formattedJobChoices.toString())

  // QUESTION FOUR
    let taskValues = jobSheet.getRange(2, 1, jobSheet.getLastRow()-1, jobSheet.getLastColumn()).getValues()
    let formattedTasks = taskValues.map(function(entry) {
      let task = entry[jobMap.task]
      return task
    })
    formattedTasks = formattedTasks.filter(x => x != "")
    Logger.log(formattedTasks)
    let taskQuestion = questions[3]
    taskQuestion.asMultipleChoiceItem()
      .setChoiceValues(formattedTasks)
      .setRequired(false)
    Logger.log("Updated Q4 choices to: " + formattedTasks)
}

function onOpen() {
  const UI = SpreadsheetApp.getUi()

  UI.createMenu("ClockingAssistant").addItem("Update Form Choices", "updateFormValues").addToUi()
}
