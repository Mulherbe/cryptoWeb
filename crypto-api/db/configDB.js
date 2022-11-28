const Sequelize = require("sequelize");

const dbuser = process.env.DB_USER;
const dbpwd = process.env.DB_PWD;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;

const sequelize = new Sequelize(
        dbName,
        dbuser,
        dbpwd,
        {
          host: dbHost,
          dialect: "mysql",
        }
);

sequelize.authenticate().then(() => {
  console.log('🔥🔥Connection has been established successfully.🔥🔥'); 
}).catch((error) => {
  console.error('🌕🌕🌕 Unable to connect to the database 🌕🌕🌕 : ', error); 
});
module.exports = sequelize;

