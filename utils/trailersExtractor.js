const imdbClient = require('./imdbClient');
const youtubeClient = require('./youtubeClient');
const _ = require('lodash');

const searchTrailers = params =>
    imdbClient.search(params).then(response => {
        var data = response.Search || [];
        if (data.length) {
            var trailers,
                youtubeDataPromises = data.map(movie => youtubeClient.searchTrailer(movie.Title)),
                moviesDataPromises = data.map(movie => imdbClient.get(movie.imdbID));
            return Promise.all(youtubeDataPromises)
                .then(youtubeData => {
                    trailers = youtubeData;
                    return Promise.all(moviesDataPromises);
                })
                .then(moviesData => {
                    var result = [];
                    data.forEach((el, index) => {
                        el.trailer = trailers[index];
                        result.push(_.merge(el, moviesData[index]));
                    });
                    response.Search = result;
                    return response;
                })
                .catch(console.error);
        } else {
            return { message: 'no movies found' };
        }
    });

module.exports = {
    searchTrailers: searchTrailers
};
