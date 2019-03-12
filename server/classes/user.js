const db = require('connection')
const mysql = require('mysql') //allows us to use mysql
const bcrypt = require('bcrypt')
const uniqid = require('uniqid')

class User {
  constructor(firstName, lastName, email, password, accountNumber, balance){
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
    this.accountNumber = accountNumber
    this.balance = balance
  }

}

//exoprt the class
module.exports = User
