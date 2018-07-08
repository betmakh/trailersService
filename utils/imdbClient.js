const fetch = require('node-fetch');
const querystring = require('querystring');
const { processRequestCache } = require('./cache');

const { IMDB_API_KEY, IMDB_API_URL } = require('./constants');

var initialQueryPrams = {
    apikey: IMDB_API_KEY,
    type: 'movie'
};

module.exports = {
    search: query =>
        processRequestCache(query, () => {
            return fetch(
                IMDB_API_URL +
                    '?' +
                    querystring.stringify(
                        Object.assign({}, initialQueryPrams, {
                            s: query
                        })
                    )
            )
                .then(response => {
                    return response.ok ? response.json() : {};
                })
                .then(data => (data.Search ? data.Search : []))
                .catch(err => console.error(err));
        }),
    get: id =>
        processRequestCache(id, () =>
            fetch(
                IMDB_API_URL +
                    '?' +
                    querystring.stringify(
                        Object.assign({}, initialQueryPrams, {
                            i: id
                        })
                    )
            )
                .then(response => (response.ok ? response.json() : {}))
                .catch(console.error)
        )
};
