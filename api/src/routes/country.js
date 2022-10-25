const { Router } = require("express");
const router = Router();
const { getCountries } = require("../controllers/getCountries");
const { getIds } = require("../controllers/getIds");


router.get('/', getCountries);

router.get('/:id', getIds);

module.exports = router;