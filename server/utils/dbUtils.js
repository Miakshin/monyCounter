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
module.exports.getIncomesByFlag = function(flag, data){
  switch (flag){
    case "last ten":
      return Income.find()
      .limit(data.repeat * 10)
      break;
    case "by date":
      return Income.find({date: { $gt: data.since, $lt: data.for }})
      break;
    }
}

module.exports.getSpendingsByFlag = function(flag,data){
  switch (flag){
    case "last ten":
      return Spending.find()
      .limit(data.repeat * 10)
      break;
    case "by date":
      return Spending.find({date: { $gt: data.since, $lt: data.for }})
      break;
    }
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
        type: data.type
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
      var cellItem = user.setings.activCells.findIndex(function(id){
        return id === data.id
      })
      cellItem === -1?
        user.setings.activCells.push(data.id):
        user.setings.activCells.splice(cellItem, 1);
      console.log(user.setings.cellItem);
      user.save();
      break;
    case "activeCurancy":
        var curancyItem = user.setings.activeCurancy.findIndex(function(el){
          return el.name === data.value ? true : false
        });
        if(curancyItem === -1){
          res.send("item isn`t find");
        }else{
          newReport = user.setings.activeCurancy[curancyItem];
          newReport.checked = !newReport.checked;
          user.setings.activeCurancy[curancyItem] = newReport;
          user.save();
        }
        break;
      case "createCurancy":
        var curancyItem = user.setings.activeCurancy.findIndex(function(el){
        return el.name.toLowerCase() === data.name.toLowerCase() ? true : false
      });
      if(curancyItem === -1){
        user.setings.activeCurancy.push(data);
        console.log(user.setings.activeCurancy)
        user.save();
      }else{
        return("Value allredy exist");
      }
      break;
      case "deleteCurancy":
        var curancyItem = user.setings.activeCurancy.findIndex(function(el){
          return el.name === data.value ? true : false
        });
        if(curancyItem === -1){
          res.send("Value isn`t find");
        }else{
          user.setings.activeCurancy.splice(curancyItem, 1);
          user.save()
        }
        break;
      case "changeAllowsCell":
        user.setings.loansAllowsCell = !user.setings.loansAllowsCell;
        console.log(user.setings.loansAllowsCell);
        user.save()
        break
      case "changeName":
        user.name = data.name;
        console.log(user.name);
        user.save()
        break
      case "changePassword":
        user.password === data.currentPass ?
          user.password = data.newPass :
          res.send("wrong password");
        user.save()
      break
      case "createSpendingType":
        var curentIndex = user.setings.spendingTypes.findIndex(function(el){
          return el.name === data.name ? true : false})
        if(curentIndex === -1){
          user.setings.spendingTypes.push(data);
          user.save()
        }else{
          res.send()
        }
      break
      case "changeColor":
        var curentIndex = user.setings.spendingTypes.findIndex(function(el){
          return el.name === data.name ? true : false})
        if(curentIndex === -1){
          return res.sendStatus(500);
        }else{
          user.setings.spendingTypes[curentIndex].color = data.color;
          user.save()
        }
      break
      case "deleteSpendingType":
        var curentIndex = user.setings.spendingTypes.findIndex(function(el){
          return el.name === data.name ? true : false})
        if(curentIndex == -1){
          res.sendStatus(500);
        }else{
          user.setings.spendingTypes.splice(curentIndex,1);
          user.save()
        }
        break;
    default:
      res.send("it setting is undefined")
  }
})
}
