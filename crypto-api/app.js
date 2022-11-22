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
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};


// Make public static folder
app.use(express.static("public"));
const errorHandler = require('middleware/error-handler');

//flux rss
const { fetchRssBtc, fetchRssEth, fetchRssActu, fetchRssNft } = require('model/FluxRSS/fluxRss');

//route api
app.get('/', (req,res, next) => {
    res.send('Bienvenue sur l\'api de cryptoTech');
});
app.use('/api/users', require('model/User/User.controller'));
app.use('/search', (res, req, next) => {
    const filters = req.query;
    console.log('filters', filters);
    const filteredCrypto = data.filter(crypto => {
        let isValid = true;
        for(key in filters) {
            console.log(key, crypto[key], filters[key]);
            isValid = isValid && crypto[key] == filters[key];
        }
        return isValid;
    });
    res.send(filteredCrypto);
});

//url des flux rss
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
//fin rroute flux rss


const bitcoinFeedUrl = 'https://coinjournal.net/fr/actualites/category/marches/feed/';

async function fetchRssFeed(feedUrl) {
    let feed = await parser.parseURL(feedUrl);
    return feed.items.map(item => {
        console.log('item',item);
        return {
            title: item.title,
            link: item.link,
            date: item.pubDate,
            description: item.description,
            image: item.image
        }
        return isValid;
    });
}

app.get('/api/rss', async (req, res) => {
    await fetchRssFeed(bitcoinFeedUrl)
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




//url des flux rss
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

// middleware gestion erreur
app.use(errorHandler);


const port = process.env.PORT || 5001;
app.listen(port, () =>
{
    console.log(`🚀 Server is running on port : ${port} 🚀`);
});


