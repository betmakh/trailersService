const imdb = require('imdb-api');
const {IMDB_API_KEY}  = require('./constants');


// cli.get({'name': 'The Toxic Avenger'}).then(console.log);

var client;
module.exports  = () => !client ? new imdb.Client({apiKey: IMDB_API_KEY}) : client;