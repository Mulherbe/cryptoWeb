var mysql = require('mysql');

const dbuser = process.env.DB_USER;
const dbpwd = process.env.DB_PWD;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;

var connection = mysql.createConnection({
    host: dbHost,
    user: db,
    password: dbpwd,
    database: dbName,
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
      });
});



