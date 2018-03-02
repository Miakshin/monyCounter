var mongoose = require('mongoose');
var Income = require('../model/incomesSchema');
var Loan = require('../model/loansSchema')
var Spending = require('../model/spendingsSchema')
var Cell = require('../model/cellsSchema')

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
  if(data.isTaxed){
      var income = new Income({
        date: data.date,
        amount: data.amount,
        currency: data.currency,
        description: data.description,
        isTaxed: data.isTaxed,
        taxTo: data.taxTo,
        taxed: data.taxed
      });
    }else if(!data.isTaxed){
      var income = new Income({
        date: data.date,
        amount: data.amount,
        currency: data.currency,
        description: data.description,
        isTaxed: data.isTaxed,

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
      var income = new Cell({
        name: data,name,
        createAt: data.createAt,
        amount: data.amount,
        currency: data.currency,
      });

    return income.save();
}

// module.exports.addReportToCell = function(data) {
//       var income = new Cell({
//         name: data,name,
//         createAt: data.createAt,
//         amount: data.amount,
//         currency: data.currency,
//       });
//
//     return income.save();
// }



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

// export function getCoctailByName(name) {
//     return Coctail.find({name: new RegExp('^' + name, 'i')})
//     .exec(function(err, coctail) {
//         if (err) throw err;
//     });
// }
