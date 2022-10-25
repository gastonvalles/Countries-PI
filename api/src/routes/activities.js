const { Router } = require("express");
const router = Router();
const { getActivities } = require("../controllers/getActivities.js");
const { postActivity } = require("../controllers/postActivities.js");


router.get('/', getActivities);

router.post('/', postActivity);

module.exports = router;