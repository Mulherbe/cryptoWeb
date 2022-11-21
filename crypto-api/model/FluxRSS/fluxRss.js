// Inclusion du module
const Feed = require("feed");

// Initialisation du module
const feed = new Feed({
    
    title: "Titre de mon fil de syndication",
    description: "Description de mon fil!",
    link: "http://example.com/",
    image: "http://example.com/logo.png",
    copyright: "X11 License",

    author: {
        name: "Monsieur X",
        email: "monsieur.x@example.com",
        link: "https://example.com/monsieur-x",
    },
});