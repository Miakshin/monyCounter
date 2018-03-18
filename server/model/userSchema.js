var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  login: String,
  password: String,
  name: String,
  registered: Number,
  setings:{
    loansAllowsCell: Boolean,
    activCells: Array,
    activeCurancy: [
      {name: String,
      checked: Boolean}
    ],
    spendingTypes: [
      {name: String,
      color: String}
    ]
  }

});

module.exports = mongoose.model('User', UsersSchema);
