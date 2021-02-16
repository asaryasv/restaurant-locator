const express = require('express');
const router = express.Router();

const restaurantsController = require('../../restaurants.js');

router.get('/restaurants/:lat/:lng',  restaurantsController.getList);

module.exports = router