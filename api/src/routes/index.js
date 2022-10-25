const { Router } = require('express');
const router = Router();

const country = require('./country.js');
const activities = require('./activities.js');

router.use('/countries', country);

router.use('/activities', activities);

module.exports = router;
