var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IncomesSchema = new Schema({
  date: Number,
  type: String,
  amount: Number,
  currency : String,
  description: String,
  from: String
});

module.exports = mongoose.model('Income',IncomesSchema);
