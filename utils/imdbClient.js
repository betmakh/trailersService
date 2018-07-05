const fetch = require('node-fetch');
const querystring = require('querystring');
const { IMDB_API_KEY, IMDB_API_URL } = require('./constants');

// cli.get({'name': 'The Toxic Avenger'}).then(console.log);

var initialQueryPrams = {
    apikey: IMDB_API_KEY
};

module.exports = {
    search: query =>
        fetch(
            IMDB_API_URL +
                '?' +
                querystring.stringify(
                    Object.assign({}, initialQueryPrams, {
                        s: query
                    })
                )
        ).then(response => (response.ok ? response.json() : response.error())),
    get: id => {
        var url =
            IMDB_API_URL +
            '?' +
            querystring.stringify(
                Object.assign({}, initialQueryPrams, {
                    i: id
                })
            );
        return fetch(url).then(response => response.ok ? response.json() : response.error());
    }
};