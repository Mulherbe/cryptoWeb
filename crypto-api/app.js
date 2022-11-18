const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const dataBase = require('./db/configDB');

app.use(express.json());
//const cors = require('cors');


app.get('/', (req,res) => {
    res.send('Home Route')
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Make public static folder
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`🚀 Server is running on port : ${port} 🚀`);
});


