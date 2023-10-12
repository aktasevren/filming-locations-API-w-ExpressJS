const express = require('express');
const axios = require("axios");
const app = express();
const cors = require("cors");

const port = 3000;


app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: ["http://localhost:3001", "http://localhost:3000", "https://filming-location-finder.vercel.app"],
        credentials: true,
    })
);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
    res.send(
        'Hi, Filming Location Finder App Example : "https://imdb-server-ljf3.onrender.com/imdbid/tt12345678"'
        );
})

app.get('/imdbid/:id', (req, res) => {
    const imdbid = req.params.id

    console.log(`Request received for ${imdbid}`)

    axios.get(`https://caching.graphql.imdb.com/?operationName=TitleFilmingLocationsPaginated&variables=%7B%22after%22%3A%22bGMwMjkwODcz%22%2C%22const%22%3A%22${imdbid}%22%2C%22first%22%3A50%2C%22isAutoTranslationEnabled%22%3Afalse%2C%22locale%22%3A%22en-US%22%2C%22originalTitleText%22%3Afalse%7D&extensions=%7B%22persistedQuery%22%3A%7B%22sha256Hash%22%3A%22f8e058a92242ae7940109b6669584768279c3e874ad37d0a792ad24f43627501%22%2C%22version%22%3A1%7D%7D`,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            const locs = response.data.data.title.filmingLocations.edges;
            const locations = [];
            locs.map((loc) => locations.push(loc.node.text));
            res.send(locations)
        })
        .catch(function (error) {
            console.log(error);
          });
})
app.listen(port, () => {
    console.log(`Filming Location Application Started`)
});








