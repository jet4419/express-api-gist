const express = require('express');
const router = express.Router();

// const PlayController = require('../Controllers/Product.Controller');
const PlayController = require('../controllers/play.controller');

//Get a list of all products
router.get('/', PlayController.getAllPlays);

//Create a new product
router.post('/', PlayController.createNewPlay);

module.exports = router;
