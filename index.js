/* Your Code Here */
//byronPoodle is an Object...
/*
const byronPoodle = {
  name: "Byron",
  ageInYears: 2,
  warn: function() {
    console.log(`Bark bark bark`);
    console.log(this);
  }
};
the value of this is the very Object, byronPoodle.
console.log(`${this.name}`) returns "Byron"...

const frog = { name: "Kermit" };
const pig = { name: "Miss Piggy" };
const speak = function() { return `It ain't easy being ${this.name}`};
frog.speak();  //=> "It ain't easy being Kermit"
pig.speak();  //=> "It ain't easy being Miss Piggy"*/

/*
const asgardianBrothers = [
  {
    firstName: "Thor",
    familyName: "Odinsson"
  },
  {
    firstName: "Loki",
    familyName: "Laufeysson-Odinsson"
  }
]

function intro(person, line) {
  return `${person.firstName} ${person.familyName} says: ${line}`
}

const phrase = "I like this brown drink very much, bring me another!"
intro(asgardianBrothers[0], phrase) //=> Thor Odinsson says: I like this brown drink very much, bring me another!


//equivalent to:


function introWithContext(line){
  return `${this.firstName} ${this.familyName} says: ${line}`
}

introWithContext.call(asgardianBrothers[0], phrase)
//=> Thor Odinsson says: I like this brown drink very much, bring me another!

introWithContext.apply(asgardianBrothers[0], [phrase])
//=> Thor Odinsson says: I like this brown drink very much, bring me another!


intro(asgardianBrothers[0], phrase) === introWithContext.call(asgardianBrothers[0], phrase) //=> true
intro(asgardianBrothers[0], phrase) === introWithContext.apply(asgardianBrothers[0], [phrase]) //=> true*/

function createEmployeeRecord(array){
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee;
}

function createEmployeeRecords(arrays){
    //Use the createEmployeeRecord function
    return arrays.map(element => createEmployeeRecord(element));
}

function createTimeInEvent(time){
    let timeInStamp = {
        type: "TimeIn",
        hour: parseInt(time.substr(11, 4)),
        date: time.substr(0, 10)
    }
    this.timeInEvents.push(timeInStamp);
    return this;
}

function createTimeOutEvent(time){
    let timeOutStamp = {
        type: "TimeOut",
        hour: parseInt(time.substr(11, 4)),
        date: time.substr(0, 10)
    }
    this.timeOutEvents.push(timeOutStamp);
    return this;
}

function hoursWorkedOnDate(time){
    let inTime = this.timeInEvents.find((emp) => {
        return emp.date === time;        
    });
    let outTime = this.timeOutEvents.find((emp) => {
        return emp.date === time;       
    });
    let hoursWorked = Math.round(Math.abs((outTime.hour - inTime.hour) / 100)); //Dividing removes minutes.
    return parseInt(hoursWorked);
}

function wagesEarnedOnDate(time){
    let payOwed = hoursWorkedOnDate(time) * this.payPerHour;
    return payOwed;
}

function findEmployeeByFirstName(srcArray, firstName){
    // let  = srcArray.map(employee)
    //return employee Object with same firstName
    //.find((emp) => {
        //return emp.firstName === ;
    // });
}

function calculatePayroll(array){
    let employeeWages = array.map(employee => allWagesFor(employee));
    let payroll = employeeWages.reduce((previous, current) => { //Calculate total wages owed.
        return previous + current;
    }, 0);
    return payroll;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}