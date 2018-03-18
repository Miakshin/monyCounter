var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpendingsSchema = new Schema({
  date: Number,
  amount: Number,
  currency : String,
  description: String,
  type: String
});

module.exports = mongoose.model('Spending',SpendingsSchema);
