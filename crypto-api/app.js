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
app.get('/', (req,res) => {
    res.send('Home Route')
});
app.use('/api/users', require('model/User/User.controller'));
//app.use('/api/flux', require('model/FluxRSS/fluxRss.controller'));
// Inclusion du module
const Feed = require("feed");
app.get("/api/rss", function (req, res) {
// Initialisation du module
const feed = "https://coinjournal.net/fr/actualites/tag/ethereum/feed/";

Post.findPosts(function (posts, err) {
        if (err) res.send("404 Not found", 404);
        else {
      // Ajout des articles
        for (var key in posts) {
            feed.item({
                title: posts[key].title,
                link: posts[key].url,
                description: posts[key].description,
                date: posts[key].date,
                });
            }
            // Paramétrage du Content-Type
            res.set("Content-Type", "text/xml");
            // Retour du fil de type RSS 2.0 au client
            res.send(feed.render("rss-2.0"));
        }
    });
});

// middleware gestion erreur
app.use(errorHandler);


const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`🚀 Server is running on port : ${port} 🚀`);
});


