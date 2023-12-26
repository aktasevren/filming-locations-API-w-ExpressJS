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
    res.status(200).send(
        `Hi, Filming Location Finder App Example : "https://imdb-server-ljf3.onrender.com/imdbid/tt10366206" <br/> <br/> 
        <h4>Response Example</h4>
    ["Wadi Rum Desert, Jordan",<br/>"Rue Foyatier, Montmartre, Paris, France",<br/>"Chateau de Chantilly, France",<br/>"Arc de Triomphe, Place Charles de Gaulle, Paris, France",<br/>
    "Studio Babelsberg, Potsdam, Germany",<br/>"Montmartre, Paris 18, Paris, France",<br/>"Krematorium Baumschulenweg, Berlin, Germany"<br/>,"Beelitz-Heilstätten, Beelitz, Brandenburg, Germany",<br/>
    "Journal Square PATH Station, Jersey City, New Jersey, USA",<br/>"Palais Garnier opera house, Paris, France",<br/>"Basilique du Sacré-Coeur, Montmartre, Paris 18, Paris, France",<br/>
    "Alte Nationalgalerie, Berlin, Germany",<br/>"Porte des Lilas, Le Métro, Paris, France",<br/>"Berlin, Germany",<br/>"Germany","Place du Trocadéro Paris, France",<br/>"Paris, France",<br/> "France"]`
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
            if (response.data.data.title == null) {
                res.json("Please check sent id value")
            } else {
                const locs = response.data.data.title.filmingLocations.edges;
                const locations = [];
                locs.map((loc) => locations.push(loc.node.text));
                res.status(200).json(locations)
            }
        })
        .catch(function (error) {
            res.status(500).send(error)
        });
})
app.listen(port, () => {
    console.log(`Filming Location Application Started`)
});



module.exports = app;




