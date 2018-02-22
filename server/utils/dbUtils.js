var mongoose = require('mongoose');
var Income = require('../model/incomesSchema')

var url = "mongodb://admin:admin@ds125198.mlab.com:25198/mony";

module.exports.setUpConnection =  function setUpConnection() {
  mongoose.connect(url);
  console.log("Succes connection");
}

module.exports.getAllIncomes =  function getAllIncomes() {
      return Income.find()
}

module.exports.createIncome = function createIncome(data) {
      var income = new Income({
        date: data.date,
        type: data.type,
        amount: data.amount,
        currency: data.currency,
        description: data.description
      });

    return income.save();
}

module.exports.deliteIncome = function deleteIncome(id) {
    return Income.findById(id).remove();
}

module.exports.changeIncome = function changeIncome(id,param){
  
}

// export function getCoctailByName(name) {
//     return Coctail.find({name: new RegExp('^' + name, 'i')})
//     .exec(function(err, coctail) {
//         if (err) throw err;
//     });
// }
