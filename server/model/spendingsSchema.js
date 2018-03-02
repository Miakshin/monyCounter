var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpendingsSchema = new Schema({
  date: Number,
  amount: Number,
  currency : String,
  description: String,
});

module.exports = mongoose.model('Spending',SpendingsSchema);
