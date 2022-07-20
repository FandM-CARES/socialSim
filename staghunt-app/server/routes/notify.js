var express = require('express');
var router = express.Router();
const { sendNotification } = require('../notifications/notify');


/* Send notification to Slack. */
router.post('/', async function(req, res, next) {
    const result = await sendNotification(req.body);
    res.send(JSON.stringify(result));
});

module.exports = router;
