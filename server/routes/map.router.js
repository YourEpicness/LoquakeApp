const express = require('express');
const router = express.Router();
const axios = require('axios');
const mapController = require('./map.controller')

router.post('/', mapController.postCoordinates)

router.get('/', mapController.getCoordinates)

router.get('/current', mapController.getCurrentCoordinates)

router.post('/query', mapController.postQueryDetails)

router.get('/query', mapController.getQueryDetails)

module.exports = router;