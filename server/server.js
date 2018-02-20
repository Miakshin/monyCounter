var express = require('express');
var monguse = require('mongoose');

var app = express();

var server = 3040;
var dbUtils = require('./utils/dbUtils')

dbUtils.setUpConnection();


app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.get('/incomes', function (req, res) {
  res.send(dbUtils.getAllIncomes());
});

app.post('/incomes', function(req, res) {
  console.log(req.body);
 })

app.listen(server, function () {
  console.log('Example app listening on port: ' + server + '!');
});
