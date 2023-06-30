const express = require('express');
const axios = require("axios");
const app = express();
const cors = require("cors");

const port = 3000;


app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: ["http://localhost:3001", "http://localhost:3000","https://filming-location-finder.vercel.app/"],
        credentials: true,
    })
);

app.get('/', (req, res) => {
    res.send('Hi, Filming Location Finder App /n Example : "https://www.locahost:3000/imdbid/tt12345678"');
})

app.get('/imdbid/:id', (req, res) => {
    console.log("imdb id geldi")
    const imdbid = req.params.id
    console.log(imdbid)
    axios.get(`https://caching.graphql.imdb.com/?operationName=TitleFilmingLocationsPaginated&variables=%7B%22after%22%3A%22bGMxMDI1MTgy%22%2C%22const%22%3A%22${imdbid}%22%2C%22first%22%3A50%2C%22locale%22%3A%22en-US%22%2C%22originalTitleText%22%3Afalse%7D&extensions=%7B%22persistedQuery%22%3A%7B%22sha256Hash%22%3A%225e1b7378425e70f1d8220f92e9be1d471bdbbab659274c32a895b2f3ffc51214%22%2C%22version%22%3A1%7D%7D`,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            const locs = response.data.data.title.filmingLocations.edges;
            const locations = [];
            locs.map((loc) => locations.push(loc.node.text));
            res.send(locations);
        })
})
app.listen(port, () => {
    console.log(`App Started`)
});