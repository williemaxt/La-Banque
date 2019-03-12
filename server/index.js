const express = require('express')
const bodyParser = require('body-parser')
const db = require('connection')
const mysql = require('mysql') //allows us to use mysql
const bcrypt = require('bcrypt')
const uniqid = require('uniqid')
//creating an instance of express
const app = express()
//using body parser
//app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//allowing cors for ajax requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
  var balance = req.body.balance //getting the starting balance(user defined)

  //hashing the password
  var hash = bcrypt.hashSync(this.password, 12)

  //creating the query
  var sql = 'INSERT INTO customers (first_name, last_name, email, password, account_number, balance) VALUES (?,?,?,?,?,?)'

  //executing the query
  db.dblink.query(sql, [firstName, lastName, email, hash, accountNumber, balance], (err, result, field) => {
    //throw error if found
    if(err) throw err;
    //if success
    console.log('server est fini..')
    res.send('account created')
    return 'account created'
  });
});


//login
app.post('/login', (req,res) => {
  //getting inputs from request body
  var email = req.body.email
  var password = req.body.password

  //sql statement
  var sql = 'SELECT * FROM customers WHERE email LIKE ?'
  var checkSql = 'SELECT `email` FROM customers WHERE email LIKE ?'

  //checking if a user exists
  db.dblink.query(checkSql, [email], (err, result) => {
    if (err) throw err

    //getting the result from the database
    var numRows = result.length

    //if result is empty then no user by that email exists
    if(numRows > 0){
      //if user exists
      //executing sql statement
      db.dblink.query(sql, [email], (err, result) => {

        //storing hash in variable for comparison
        var solvedHash = result[0].password

        //if statement to compare decrypted hash and currently supplied password
        if(bcrypt.compareSync(password, solvedHash)){
          //if password matches
          res.send({
            'message': 'match',
            'accountNumber': result[0].account_number,
            'email': result[0].email,
            'firstName': result[0].first_name,
            'lastName': result[0].last_name
          });
        } else {
          //if password does not match
          res.send({'message': 'nonmatch'});
        }
      });
    } else {
      //if user does not exist
      console.log('No user');
      res.send({'message':'nouser'})
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

  //check to see if recipient exists
  var checkSql = 'SELECT account_number from customers WHERE account_number LIKE ?'
  //sql query(s) to conduct transaction
  var removeSql = 'UPDATE customers SET balance = balance - ? WHERE account_number LIKE ?'
  var addSql = 'UPDATE customers SET balance = balance + ? WHERE account_number LIKE ?'

  //functions to executing queries

  //check if user exists
  db.dblink.query(checkSql, [accountNumber], (err, result, fields) => {
    if (err) throw err
    //variable for length of the returned result
    var numRows = result.length
    //if the username returns a username then continue queries
    if (numRows > 0){
      //remove the amount from the current account
      db.dblink.query(removeSql,[amount,currentAccount], (err,result) => {
        if (err) throw err
        console.log('finished')
        console.log('funds removed from your account ...')
      });

      //adding amount to the account number(current recipient)
      db.dblink.query(addSql,[amount,accountNumber], (err,result) => {
        if (err) throw err
        console.log('funds added from your recipients account ...')
        res.send({'message':'finished'})
      });
    } else {
      res.send({'message':'nouser'})
    }
  })
});


//endpoing for getting the account balance
app.post('/balance', (req, res) => {
  var currentAccount = req.body.currentAccount
  //sql to check if account exists
  var checkSql = 'SELECT account_number FROM customers WHERE account_number LIKE ?'
  //sql to return the account balance
  var balanceSql = 'SELECT balance FROM customers WHERE account_number like ?'

  //query to check if the account exists
  db.dblink.query(checkSql, [currentAccount], (err, result, fields) => {
    if (err) throw err

    //variable for length of result
    var numRows = result.length

    //if result is not 0 then the account exists
    if(numRows > 0){
      //running query for account balance
      db.dblink.query(balanceSql, [currentAccount], (err, result, fields) => {
        if (err) throw err

        //sending response
        res.send({'message': result[0].balance})
      })
    } else {
      res.send({'message': 'noauth'})
      console.log('nonauth')
    }
  })
});


//app listening on port
app.listen(3000)
