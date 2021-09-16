var express = require('express');
var router = express.Router();
const earthquakeController = require('./earthquake.controller')



/* GET users listing. */
router.get('/', earthquakeController.getEarthquakes);

router.get('/:earthquakeId', (req, res) => {
  const earthquakeId = Number(req.params.earthquakeId);
})

module.exports = router;
