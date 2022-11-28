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
var corsOptions = {
    baseUrl : 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json',
    }
}



// Make public static folder
app.use(express.static("public"));

//================================================================================================
//===================================== ROUTES API ===================================================
//controller
const userController = require('model/User/User.controller');
//route api
app.get('/', (req,res, next) => {
    res.send('Bienvenue sur l\'api de cryptoTech');
});

const utils = require ('model/Auth/utils/utils');
app.get('/auth', async (req, res) => {
    try {
        res.redirect (utils.request_get_auth_code_url);
        } catch (error) {
        res.sendStatus (500);
        console.log (error.message);
        }
});
app.get(process.env.REDIRECT_URI, async (req, res) => {
    // get authorization token
    const authorization_token = req.query.code;
    try {
        // ! get access token using authorization token
        const response = await utils.get_access_token (authorization_token.code);
        console.log ({data: response.data});
        // get access token from payload
        const {access_token} = response.data;
        const user = await helpers.get_profile_data (access_token);
        const user_data = user.data;
        res.send (`
        <h1> welcome ${user_data.name}</h1>
        <img src="${user_data.picture}" alt="user_image" />
        `);
        console.log (user_data);

    } catch (error) {
        console.log(error.message);
        res.sendStatus (500);
        
    }

});


app.use('/api/users', userController);


//================================================================================================
//===================================== ROUTE FLUX RSS ===================================================
//flux rss

const { fetchRssBtc, fetchRssEth, fetchRssActu, fetchRssNft } = require('model/FluxRSS/fluxRss');
const url = require('model/FluxRSS/urlRss');
//route flux rss
app.get('/api/rss/btc', async (req, res) => {
    await fetchRssBtc(url.btcRss)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(404).json({
            status: 'error',
            message: 'An error occurred when fetching news'
        })
    })
})

app.get('/api/rss/eth', async (req, res) => {
    await fetchRssEth(url.ethRss)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(404).json({
            status: 'error',
            message: 'An error occurred when fetching news'
        })
    })
})

app.get('/api/rss/actu', async (req, res) => {
    await fetchRssActu(url.actuRss)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(404).json({
            status: 'error',
            message: 'An error occurred when fetching news'
        })
    })
})

app.get('/api/rss/nft', async (req, res) => {
    await fetchRssNft(url.nftRss)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(404).json({
            status: 'error',
            message: 'An error occurred when fetching news'
        })
    })
})
//fin route flux rss
//================================================================================================
//===================================== ROUTE FLUX RSS ===================================================

// middleware gestion erreur
const errorHandler = require('middleware/error-handler');
app.use(errorHandler);


const port = process.env.PORT || 5000;
app.listen(port, () =>
{
    console.log(`🚀 Server is running on port : ${port} 🚀`);
});


