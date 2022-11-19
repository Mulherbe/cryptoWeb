const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const dbhost = process.env.DB_HOST;
const dbport = process.env.DB_PORT;
const dbuser = process.env.DB_USER;
const dbpwd = process.env.DB_PWD;
const dbName = process.env.DB_NAME;

module.exports = db = {};
//function iniatilize
initialize();


async function initialize() {
    // création de la db si elle n'existe pas
    //console.log('start')
    const connection = mysql.createPool({
        host: dbhost,
        port: dbport,
        user: dbuser,
        password: dbpwd,
        multipleStatements: true
    });
    const [rows, fields] = await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`);
    //console.log('end')
    // connexion à la db
    const sequelize = new Sequelize(
        dbName,
        dbuser,
        dbpwd,
        {
            host: dbhost,
            dialect: "mysql",
        }
    );

    // initialisation des modèles   
    db.User = require('model/User/User.model')(sequelize);

    // sync tout les models de la db
    await sequelize.sync({ alter: true });
}