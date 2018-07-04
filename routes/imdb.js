var express = require('express');
var router = express.Router();

var getClient = require('../utils/imdbClient');

/* GET home page. */
router.get('/', function(req, res, next) {
    var client = getClient();
    client.get({'id': 'tt3896198'}).then(data => {
        res.json(data);
    }).catch(console.error);

    // res.render('index', { title: 'Express' });
});

module.exports = router;
