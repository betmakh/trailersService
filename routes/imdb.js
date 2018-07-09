var express = require('express');
var router = express.Router();
var misspellings = require('misspellings');

var trailersExtractor = require('../utils/trailersExtractor');
var imdbClient = require('../utils/imdbClient');

/* GET home page. */
router.get('/', function(req, res) {
    var query = req.query['query'];
    var page = req.query['page'] || 1;
    var id = req.query['id'];

    if (query) {
        trailersExtractor
            .searchTrailers({ query, page })
            .then(data => {
                var corrections = misspellings.correctWordsFor(query);
                data.corrections = corrections;
                res.json(data);
            })
            .catch(err => {
                console.error(err);
                return res.status(500).send(err);
            });
    } else if (id) {
        imdbClient
            .get(id)
            .then(data => {
                res.json(data);
            })
            .catch(err => res.status(500).send(err));
    } else {
        res.sendStatus(500);
    }
});

module.exports = router;
