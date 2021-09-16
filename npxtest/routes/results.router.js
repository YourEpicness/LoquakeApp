const express = require('express');
const router  = express.Router();
const resultsController = require('./results.controller')

router.get('/', resultsController.getResults)

module.exports = router;