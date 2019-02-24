const express = require('express')
const bodyParser = require('body-parser')
const db = require('connection')
const mysql = require('mysql') //allows us to use mysql
const bcrypt = require('bcrypt')
const uniqid = require('uniqid')

//creating an instance of express
const app = express()

//using body parser
app.use(bodyParser.urlencoded({extended: false}))

//console log to show server running
console.log('server est corrir ...');

//routes to run queries
//register
app.post('/register', (req,res) => {
  //getting inputs from request body
  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var email = req.body.email
  var password = req.body.password
  var accountNumber = uniqid.time()
  var balance = 0

  //hashing the password
  var hash = bcrypt.hashSync(password, 12)

  //creating the query
  var sql = 'INSERT INTO customers (first_name, last_name, email, password, account_number, balance) VALUES (?,?,?,?,?,?)'

  //executing the query
  db.dblink.query(sql, [firstName, lastName, email, hash, accountNumber, balance], (err, result, field) => {
    //throw error if found
    if(err) throw err;
    //if success
    console.log('server est fini..')
    res.send('account created')
  });
});


//login
app.post('/login', (req,res) => {

  //getting inputs from request body
  var email = req.body.email
  var password = req.body.password

  //sql statement
  var sql = 'SELECT `password` FROM customers WHERE email LIKE ?'

  //executing sql statement
  db.dblink.query(sql, [email], (err, result) => {

    //storing hash in variable for comparison
    var solvedHash = result[0].password

    //if statement to compare decrypted hash and currently supplied password
    if(bcrypt.compareSync(password, solvedHash)){
      //if password matches
      res.send('it matches');
    } else {
      //if password does not match
      res.send('it does not match');
    }
  });

});



//end point for confirming users(before sending money)
app.post('/search', (req, res) => {
  //variable for the account number we want to search
  var accountNumber = req.body.accountNumber

  //sql statement to
  sql = 'SELECT first_name, last_name FROM `customers` WHERE account_number LIKE ?'

  //executing sql statements
  db.dblink.query(sql,[accountNumber], (err, result) => {
    if (err) throw err

    //variables to store database results
    var firstName = result[0].first_name
    var lastName = result[0].last_name

    //sending data base results as a json response
    res.send({'firstName':firstName, 'lastName':lastName})
  })

});



//end points for transactions
//end point for sending money to others
app.post('/send', (req, res) => {

  //getting inputs from request body
  var accountNumber = req.body.accountNumber
  var currentAccount = req.body.currentAccount
  var amount = req.body.amount

  //sql query(s) to conduct transaction
  var removeSql = 'UPDATE customers SET balance = balance - ? WHERE account_number LIKE ?'
  var addSql = 'UPDATE customers SET balance = balance + ? WHERE account_number LIKE ?'

  //functions to executing queries
  //remove the amount from the current account
  db.dblink.query(removeSql,[amount,currentAccount], (err,result) => {
    if (err) throw err
    //logging tha
    console.log('finished');
    //returning the result
    console.log('funds removed from your account ...')
  });

  //adding amount to the account number(current recipient)
  db.dblink.query(addSql,[amount,accountNumber], (err,result) => {
    if (err) throw err
    console.log('funds added from your recipients account ...')
    res.send({'message':'finished'})
  });

});



//app listening on port
app.listen(3000)
