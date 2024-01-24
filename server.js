const express = require('express');
const axios = require("axios");
const app = express();
const cors = require("cors");

const port = 3000;
const version = "24.2"

app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: ["http://localhost:3001", "http://localhost:3000", "https://filming-location-finder.vercel.app"],
        credentials: true,
    })
);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    return next();
});

app.get('/', (req, res) => {
    res.status(200).send(
        `Hi ,<br/> <br/> Filming Location Finder API Example : "https://filming-locations-api-w-express-js.vercel.app/imdbid/tt10366206" <br/> <br/> 
        <h4>Response Example</h4>
    ["Wadi Rum Desert, Jordan",<br/>"Rue Foyatier, Montmartre, Paris, France",<br/>"Chateau de Chantilly, France",<br/>"Arc de Triomphe, Place Charles de Gaulle, Paris, France",<br/>
    "Studio Babelsberg, Potsdam, Germany",<br/>"Montmartre, Paris 18, Paris, France",<br/>"Krematorium Baumschulenweg, Berlin, Germany"<br/>,"Beelitz-Heilstätten, Beelitz, Brandenburg, Germany",<br/>
    "Journal Square PATH Station, Jersey City, New Jersey, USA",<br/>"Palais Garnier opera house, Paris, France",<br/>"Basilique du Sacré-Coeur, Montmartre, Paris 18, Paris, France",<br/>
    "Alte Nationalgalerie, Berlin, Germany",<br/>"Porte des Lilas, Le Métro, Paris, France",<br/>"Berlin, Germany",<br/>"Germany","Place du Trocadéro Paris, France",<br/>"Paris, France",<br/> "France"]`
    );
})

app.get('/imdbid/:id', (req, res) => {
    const start = performance.now();
    const imdbid = req.params.id
    axios.get(`https://caching.graphql.imdb.com/?operationName=TitleFilmingLocationsPaginated&variables=%7B%22after%22%3A%22bGMwMjkwODcz%22%2C%22const%22%3A%22${imdbid}%22%2C%22first%22%3A50%2C%22isAutoTranslationEnabled%22%3Afalse%2C%22locale%22%3A%22en-US%22%2C%22originalTitleText%22%3Afalse%7D&extensions=%7B%22persistedQuery%22%3A%7B%22sha256Hash%22%3A%22f8e058a92242ae7940109b6669584768279c3e874ad37d0a792ad24f43627501%22%2C%22version%22%3A1%7D%7D`,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.data.data.title == null) {
                res.json("no such imdb id was found")
            } else {
                console.log(response.data.data.title.filmingLocations.edges)
                const locs = response.data.data.title.filmingLocations.edges;
                const locations = [];
                locs.map((loc, index) => locations.push([index, loc.node.text, loc.node.displayableProperty.qualifiersInMarkdownList[0].markdown]));
                const end = performance.now();
                res.status(200).json({
                    "version": version,
                    "imdbid": imdbid,
                    "locations": locations,
                    "runtime": end - start,
                })
            }
        })
        .catch(function (error) {
            res.status(500).send(error)
        });
})
app.listen(port, () => {
    console.log(`filming locations API started on port = ${port}`)
});

module.exports = app;