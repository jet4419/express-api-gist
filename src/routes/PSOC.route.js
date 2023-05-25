const express = require('express');
const router = express.Router();

// const PlayController = require('../Controllers/Product.Controller');
const PsocController = require('../controllers/PSOC.controller');

//Get a list of all products
router.get('/', PsocController.getPSOC);

//Create a new product
// router.post('/', PsocController.addPSOC);
router.post('/upload', PsocController.uploadPSOC);

module.exports = router;
