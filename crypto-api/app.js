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

//================================================================================================
//===================================== ROUTES API ===================================================
//controller
const userController = require('model/User/User.controller');
//route api
app.get('/', (req,res, next) => {
    res.send('Bienvenue sur l\'api de cryptoTech');
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


