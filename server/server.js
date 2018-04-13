var express = require('express');
var monguse = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();


var server = 3046;
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

app.post('/reports/:type/:flag', function (req, res) {
  switch (req.params.type){
    case "encoming":
    console.log(req.params.flag , req.body)
      dbUtils.getIncomesByFlag(req.params.flag, req.body)
      .then(function(data){
          res.send(data);
        })
      break;
    case "spending":
      dbUtils.getSpendingsByFlag(req.params.flag, req.body)
      .then(function(data){
          res.send(data);
        })
      break;
  }
});

app.get('/incomes/:id', function (req, res) {
  dbUtils.getIncome(res.params.id).then(data => res.send(data))
});

app.get('/reports/:type', function (req, res) {
  switch (req.params.type) {
  case "encoming":
    dbUtils.getAllIncomes()
    .then(function(data){
        res.send(data);
      })
    break;
  case "spending":
    dbUtils.getAllSpendings()
    .then(function(data){
        res.send(data);
      })
    break;
  case "loan":
    dbUtils.getAllLoans()
    .then(function(data){
        res.send(data);
      })
    break;
    case "cell":
      dbUtils.getAllCells()
      .then(function(data){
          res.send(data);
        })
      break;
  default:
    res.send("error")
}
});

app.post('/report/:type', function(req, res) {
  switch (req.params.type) {
  case "encoming":
    dbUtils.createIncome(req.body)
    .then(function(data){
        res.send(data);
      })
    break;
  case "spending":
    dbUtils.createSpending(req.body)
    .then(function(data){
        res.send(data);
      })
    break;
  case "loan":
    dbUtils.createLoan(req.body)
    .then(function(data){
        res.send(data);
      })
    break;
    case "cell":
      dbUtils.createCell(req.body)
      .then(function(data){
          res.send(data);
        })
      break;
  default:
    res.send("error")
}
 })
 app.get('/user/:login',function(req, res){
   dbUtils.getUserByLogin(req.params.login).then((data)=>res.send(data))
 })

 app.get('/cells/:id',function(req, res){
   dbUtils.getCellById(req.params.id).then((data)=>res.send(data))
 })

 app.post('/cells/:id',function(req, res){
   console.log(req.body);
   dbUtils.addReportToCell(req.params.id, req.body).then((data)=>res.send(data));
 })

 app.post('/cells/borrow/:id',function(req, res){
   dbUtils.createBorrowFromCell(req.params.id, req.body)
    .then(()=>res.sendStatus(200))
    .catch(()=>res.sendStatus(500))
 })

 app.post('/createUser/', function(req, res){
   dbUtils.createUser(req.body).then((data)=>res.send(data))
 })

 app.post('/user/:login/:settings/:part',function(req, res){
   console.log(req.params, req.body)
   dbUtils.changeSettingData(req.params.login, req.params.part, req.body).then((data)=>res.send(data))
 })

 app.delete('/incomes/:id', (req, res)=>{
  dbUtils.deliteIncome(req.params.id).then(data => res.send(data))
 })


app.listen(server, function () {
  console.log('Example app listening on port: ' + server + '!');
});
