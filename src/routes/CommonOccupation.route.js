const express = require('express');
const router = express.Router();

// const PlayController = require('../Controllers/Product.Controller');
const CommonOccupationController = require('../controllers/CommonOccupation.controller');

//Get a list of all products
router.get('/', CommonOccupationController.getCommonOccupation);

//Create a new product
router.post('/', CommonOccupationController.addCommonOccupation);
router.post('/upload', CommonOccupationController.uploadCommonOccupation);
router.delete('/drop', CommonOccupationController.dropCommonOccupation);

module.exports = router;
