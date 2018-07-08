var express = require('express');
var router = express.Router();

var trailersExtractor = require('../utils/trailersExtractor');
var imdbClient = require('../utils/imdbClient');

/* GET home page. */
router.get('/', function(req, res) {
    var query = req.query['query'];
    var id = req.query['id'];

    if (query) {
        trailersExtractor
            .searchTrailers(query)
            .then(data => {
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
