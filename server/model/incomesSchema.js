var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IncomesSchema = new Schema({
  date: Number,
  amount: Number,
  currency : String,
  description: String,
  isTaxed: Boolean,
  taxTo: Array,
  taxed: Number
});

module.exports = mongoose.model('Income',IncomesSchema);
