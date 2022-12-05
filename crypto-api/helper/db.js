const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const dbhost = process.env.DB_HOST;
const dbport = process.env.DB_PORT;
const dbuser = process.env.DB_USER;
const dbpwd = process.env.DB_PWD || "db_password";
const dbName = process.env.DB_NAME;

const usersModels = require('../model/User/User.model');
const usersModel = usersModels.users;

const cryptoModels = require('../model/Crypto/Crypto.model');
const cryptoModel = cryptoModels.crypto;

module.exports = db = {};
//function iniatilize

initialize();


async function initialize()
{
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
    sequelize.authenticate().then(() => {
        console.log('🔥🔥Connection has been established successfully.🔥🔥'); 
      }).catch((error) => {
        console.error('🌕🌕🌕 Unable to connect to the database 🌕🌕🌕 : ', error); 
      });

    // initialisation des modèles   
    db.Users = usersModel(sequelize);
    db.Cryptos = cryptoModel(sequelize);

    db.Cryptos.belongsToMany(db.Users, { through: 'UserCrypto' });
    db.Users.belongsToMany(db.Cryptos, { through: 'UserCrypto' });

    // db.Users = require('model/User/User.model')(sequelize);
    // db.Popular = require('model/Crypto/Crypto.model')(sequelize);

    // sync tout les models de la db
    await sequelize.sync({ alter: true });
}