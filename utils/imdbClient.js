const fetch = require('node-fetch');
const querystring = require('querystring');
const { processRequestCache } = require('./cache');

const { IMDB_API_KEY, IMDB_API_URL } = require('./constants');

var initialQueryPrams = {
    apikey: IMDB_API_KEY,
    type: 'movie'
};

module.exports = {
    search: params =>
        processRequestCache(params, () => {
            return fetch(
                IMDB_API_URL +
                    '?' +
                    querystring.stringify(
                        Object.assign({}, initialQueryPrams, {
                            s: params.query,
                            page: params.page || 1
                        })
                    )
            )
                .then(response => {
                    return response.ok ? response.json() : {};
                })
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
