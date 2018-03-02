var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LoansSchema = new Schema({
  date: Number,
  amount: Number,
  currency : String,
  description: String,
  from: String
});

module.exports = mongoose.model('Loan',LoansSchema);
