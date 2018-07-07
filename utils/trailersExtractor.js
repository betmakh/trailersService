const imdbClient = require('./imdbClient');
const youtubeClient = require('./youtubeClient');

const searchTrailers = query =>
    imdbClient.search(query).then(data => {
        var youtubeDataPromises = [];
        if (data.length) {
            youtubeDataPromises = data.map(movie => youtubeClient.searchTrailer(movie.Title));
        }
        return Promise.all(youtubeDataPromises)
            .then(searchTrailerResult => ({
                trailers: searchTrailerResult,
                movies: data
            }))
            .then(data => {
                var result = [];
                data.movies.forEach((el, index) => {
                    el.trailer = data.trailers[index];
                    result.push(el);
                });
                return result;
            });
    });

module.exports = {
    searchTrailers: searchTrailers
};
