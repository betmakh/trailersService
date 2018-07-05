var express = require('express');
var router = express.Router();
 
var imdbClien = require('../utils/imdbClient');


/* GET home page. */
router.get('/', function(req, res) {
    var query = req.param('query');
    var id = req.param('id');

    if (query) {
        imdbClien.search(query).then(data => {
            res.json(data);
        }).catch(err => res.status(500).send(err));
    } else if (id) {
        imdbClien.get(id).then(data => {
            res.json(data);
        }).catch(err => res.status(500).send(err));
    } else {
        res.sendStatus(500);
    }

});

module.exports = router;
