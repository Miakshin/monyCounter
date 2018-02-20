var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IncomesSchema = new Schema({
  date: Number,
  type: String,
  amount: Number
});

module.exports = mongoose.model('Income',IncomesSchema);
