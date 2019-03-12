const express = require('express')
const bcrypt = require('bcrypt')
const uniqid = require('uniqid')
const db = require('connection')
const mysql = require('mysql') //allows us to
//creating an instance of express
const app = express()
//allowing cors for ajax requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// CLASS TO REGISTER
class Register {
  constructor(firstName, lastName, email, password, accountNumber, balance){
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
    this.accountNumber = accountNumber
    this.balance = balance
  }

  //getters

  //setters

  //methods
  register(){
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
  }
}

module.exports = {
  register: Register
}
