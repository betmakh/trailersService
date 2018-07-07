const { YOUTUBE_API_URL, YOUTUBE_API_KEY } = require('./constants');
const fetch = require('node-fetch');
const querystring = require('querystring');

module.exports = {
    searchTrailer: movie =>
        fetch(
            `${YOUTUBE_API_URL}&${querystring.stringify({
                key: YOUTUBE_API_KEY,
                q: movie + ' official trailer',
                maxResults: 1,
                videoDuration: 'short',
                type: 'video'
            })}`
        )
            .then(response => response.json())
            .then(data => (data.items ? Promise.resolve(data.items[0]) : data))
};
