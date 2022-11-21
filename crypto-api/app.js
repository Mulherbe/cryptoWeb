require('rootpath')();
//Petite aide pour rendre node.js require relatif à la racine de votre projet
//ROOTH_PATH = __dirname;
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Make public static folder
app.use(express.static("public"));
const errorHandler = require('middleware/error-handler');

//route api
app.get('/', (req, res) =>
{
    res.send('Home Route')
});
app.use('/api/users', require('model/User/User.controller'));
app.use('/api/crypto', require('model/Crypto/Crypto.controller'));
// middleware gestion erreur
app.use(errorHandler);


const port = process.env.PORT || 5001;
app.listen(port, () =>
{
    console.log(`🚀 Server is running on port : ${port} 🚀`);
});


