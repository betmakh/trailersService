var express = require('express');
var router = express.Router();

var trailersExtractor = require('../utils/trailersExtractor');

/* GET home page. */
router.get('/', function(req, res) {
    var query = req.param('query');
    var id = req.param('id');

    if (query) {
        trailersExtractor
            .searchTrailers(query)
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                console.log('err', err);
                return res.status(500).send(err);
            });
    } else if (id) {
        trailersExtractor
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
