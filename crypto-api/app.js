require('rootpath')();
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);

app.use(express.text({ type: 'text/plain' }));
app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(cors());
// Make public static folder

//===================================== ROUTES API HOME==================================

app.get('/', (req, res, next) =>
{
    res.send('Bienvenue sur l\'api de cryptoTech');
});


//================================================================================================
//===================================== ROUTES OAuth2 GoogleAPI ==================================

const utils = require('./model/OAuth2/utils');

app.get('/api/auth', async (req, res) =>
{
    try
    {
        res.redirect(utils.request_get_auth_code_url);
    } catch (error)
    {
        res.sendStatus(500);
        console.log(error.message);
    }
});

app.get('/api/callback', async (req, res) =>
{
    const authorization_token = req.query.code;
    console.log('authorization_token', authorization_token);
    try
    {
        const response = await utils.get_access_token(authorization_token);
        console.log({ data: response.data });
        const user_info = await utils.get_user_info(response.data);
        console.log('user_info', user_info);
        res.send(`Hello ${user_info.name}`);
    } catch (error)
    {
        res.sendStatus(500);
        console.log(error.message);
    }
});


//================================================================================================
//===================================== ROUTES API ===============================================
//controller
const userController = require('./controller/User.controller');
const cryptoController = require('./controller/Crypto.controller');
const authController = require('./controller/Auth.controller');
//callback route api user controller
app.use('/api/user', userController);
app.use('/api/login', authController);
app.use('/api/crypto', cryptoController);


//================================================================================================
//===================================== ROUTE FLUX RSS ===================================================
//flux rss

const { fetchRssBtc, fetchRssEth, fetchRssActu, fetchRssNft } = require('./model/FluxRSS/fluxRss');
const url = require('./model/FluxRSS/urlRss');
//route flux rss
app.get('/api/rss/btc', async (req, res) =>
{
    await fetchRssBtc(url.btcRss)
        .then(data =>
        {
            res.status(200).json(data)
        })
        .catch(err =>
        {
            res.status(404).json({
                status: 'error',
                message: 'An error occurred when fetching news'
            })
        })
})
app.get('/api/rss/eth', async (req, res) =>
{
    await fetchRssEth(url.ethRss)
        .then(data =>
        {
            res.status(200).json(data)
        })
        .catch(err =>
        {
            res.status(404).json({
                status: 'error',
                message: 'An error occurred when fetching news'
            })
        })
})
app.get('/api/rss/actu', async (req, res) =>
{
    await fetchRssActu(url.actuRss)
        .then(data =>
        {
            res.status(200).json(data)
        })
        .catch(err =>
        {
            res.status(404).json({
                status: 'error',
                message: 'An error occurred when fetching news'
            })
        })
})
app.get('/api/rss/nft', async (req, res) =>
{
    await fetchRssNft(url.nftRss)
        .then(data =>
        {
            res.status(200).json(data)
        })
        .catch(err =>
        {
            res.status(404).json({
                status: 'error',
                message: 'An error occurred when fetching news'
            })
        })
})


//fin route flux rss
// middleware gestion erreur
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);


const port = process.env.PORT || 5000;
server.listen(port, () =>
{
    console.log(`🚀 Server is running on port : ${port} 🚀`);
});


require('./services/Crypto.service').updateMarkets();