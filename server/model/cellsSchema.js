var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CellsSchema = new Schema({
  name: String,
  incomesForm: Array,
  loansTo:Array,
  spendings: Array,
  createAt: Date,
  tax: Number,
  acamulated: Number,
  diagramColor: String

});

module.exports = mongoose.model('Cell', CellsSchema);
