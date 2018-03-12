var mongoose = require('mongoose');
var Income = require('../model/incomesSchema');
var Loan = require('../model/loansSchema');
var Spending = require('../model/spendingsSchema');
var Cell = require('../model/cellsSchema');
var User = require('../model/userSchema');

var url = "mongodb://admin:admin@ds125198.mlab.com:25198/mony";

module.exports.setUpConnection =  function setUpConnection() {
  mongoose.connect(url);
  console.log("Succes connection");
}

module.exports.getAllIncomes =  function() {
      return Income.find()
}
module.exports.getAllSpendings =  function() {
      return Spending.find()
}
module.exports.getAllLoans =  function() {
      return Loan.find()
}
module.exports.getAllCells =  function() {
      return Cell.find()
}

module.exports.createIncome = function (data) {
  console.log(data);
  if(data.isTax){
      var income = new Income({
        date: data.date,
        amount: data.amount,
        currency: data.currency,
        description: data.description,
        isTaxed: data.isTax,
        taxTo: data.taxTo,
        taxed: data.taxed
      });
    }else if(!data.isTax){
      var income = new Income({
        date: data.date,
        amount: data.amount,
        currency: data.currency,
        description: data.description,
        isTaxed: data.isTax,

      });
    }

    return income.save();
}

module.exports.createSpending = function (data) {
      var spending = new Spending({
        date: data.date,
        amount: data.amount,
        currency: data.currency,
        description: data.description,
      });

    return spending.save();
}

module.exports.createLoan = function (data) {
      var loan = new Loan({
        date: data.date,
        amount: data.amount,
        currency: data.currency,
        description: data.description,
        from: data.from
      });

    return loan.save();
}

module.exports.createCell = function (data) {
      var cell = new Cell({
        name: data.name,
        createAt: data.createAt,
        tax: data.tax
      });

    return cell.save();
}

module.exports.createUser = function(data){
  var user = new User({
    login: data.login,
    password: data.password,
    name: data.name,
    createAt: data.createAt,
  });

return user.save();
}

module.exports.getUserByLogin = function(login){
  return User.findOne({
    login : login
  })
}

module.exports.deliteIncome = function deleteIncome(id) {
    return Income.findById(id).remove();
}

module.exports.changeIncome = function changeIncome(id,param){
    return Income.findById(id)
}

module.exports.getIncomesByType = function getIncomesByType(param){
    return Income.find({
      type : param
    }).
  limit(10)
}

module.exports.getIncomesSum = function getIncomesSum(type){
  return Income.find({
    type : type
  })
}

module.exports.getCellById = function(id) {
    return Cell.findById(id)
}

module.exports.addReportToCell = function(id, data){
  return Cell.findById(id, function(err, cell){
    if(err){console.log("err")}
    var newData = cell.incomesForm;
    var newAmount = Number(cell.acamulated);
    newAmount +=data.amount;
    newData.push(data);
    cell.incomesForm = newData;
    cell.acamulated = newAmount;
    cell.save()
  })
}

module.exports.changeSettingData = function(user, settingPart, data){
  return User.findOne({login : user} ,function(err, user){
    switch (settingPart) {
    case "activCells":
      console.log("it is activeCells")
      break;
    case "activeCurancy":
        var curancyItem = user.setings.activeCurancy.findIndex(function(el){
          return el.name === data.value ? true : false
        });
        if(curancyItem === undefined){
          res.send("item isn`t find");
        }else{
          newReport = user.setings.activeCurancy[curancyItem];
          newReport.checked = !newReport.checked;
          console.log(newReport);
          user.setings.activeCurancy[curancyItem] = newReport;
          console.log(user.setings.activeCurancy);
          user.save();
        }

      break;
    default:
      res.send("it setting is undefined")
  }
})
}
