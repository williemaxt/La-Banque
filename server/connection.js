const sql = require('sql') //requiring the sql module

//creating a connection to the database
const dblink = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ogbytheoz',
  database: 'banque'
})

//exporting the dblink variable for use outside the file
module.exports = {
  dblink
}
