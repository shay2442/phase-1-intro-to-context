let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row) {
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let createTimeOutEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}


function hoursWorkedOnDate(obj, workDate) {
    // console.log(obj.timeInEvents);
    let inTime = obj.timeInEvents
      .filter((element) => element.date === workDate)
      .map((element) => element.hour);
    let outTime = obj.timeOutEvents
      .filter((element) => element.date === workDate)
      .map((element) => element.hour);
    return (outTime - inTime) / 100;
  }

let wagesEarnedOnDate = function(employee, dateSought) {
    let rawWage = hoursWorkedOnDate(employee, dateSought)
    * employee.payPerHour
    return parseFloat(rawWage.toString())
}
let allWagesFor = function(employee) {
    let eligibleDates = employee.timeInEvents.map(function(e) {
        return e.date
    })
    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
        return rec.firstName === firstName
    })
}

function calculatePayroll(arrays) {
    arrays.map(wagesEarnedOnDate(array)).reduce((a, b) => (a = a + b), 0);
  function calculatePayroll(array) {
      return array.map(obj => allWagesFor(obj))
      .reduce((a, b) => (a = a + b), 0); }
  }