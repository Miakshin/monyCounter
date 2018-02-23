var express = require('express');
var monguse = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();


var server = 3040;
var dbUtils = require('./utils/dbUtils');

dbUtils.setUpConnection();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(cors({ origin: '*' }));


app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.get('/incomes', function (req, res) {
  dbUtils.getAllIncomes().then(data => res.send(data))
});

app.post('/incomes', function(req, res) {
  dbUtils.createIncome(req.body).then(function(data){
    res.send(data);
  })
 })

 app.delete('/incomes/:id', (req, res)=>{
  dbUtils.deliteIncome(req.params.id).then(data => res.send(data))
 })


app.listen(server, function () {
  console.log('Example app listening on port: ' + server + '!');
});
