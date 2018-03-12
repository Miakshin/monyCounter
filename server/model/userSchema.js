var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  login: String,
  password: String,
  name: String,
  registered: Number,
  setings:{
    activCells: Array,
    activeCurancy: [
      {name: String,
      checked: Boolean}
    ]
  }

});

module.exports = mongoose.model('User', UsersSchema);
