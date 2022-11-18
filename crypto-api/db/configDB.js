var mysql = require('mysql');

const dbuser = process.env.DB_USER;
const dbpwd = process.env.DB_PWD;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
 
let connection  = mysql.createPool({
    host: dbHost,
    user: dbuser,
    password: dbpwd,
    database: dbName,
});
  
connection.getConnection((err) => {
    if (err) {
      console.log("Database Connection Failed !!!", err);
    } else {
      console.log("connected to Database");
    }
});

module.exports = connection;

