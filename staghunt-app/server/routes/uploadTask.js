var express = require('express');
var router = express.Router();
const { uploadTask } = require('../db/service');


/* Uploads complete task to MongoDB. */
router.post('/', async function(req, res, next) {
    const result = await uploadTask(req.body);
    res.send(JSON.stringify(result));
});

module.exports = router;
