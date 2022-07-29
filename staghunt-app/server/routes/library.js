var express = require('express');
var router = express.Router();
const { getLibrary } = require('../db/libraryService');


/* Gets a set of games from MongoDB. */
router.get('/', async function(req, res, next) {
    const result = await getLibrary("10");
    res.send(JSON.stringify(result));
});

router.post('/', async function(req, res, next) {
    const result = await getLibrary(req.body);
    res.send(JSON.stringify(result));
});

module.exports = router;
