const express = require('express');
const router = express.Router();

// const PlayController = require('../Controllers/Product.Controller');
const CodebookController = require('../controllers/Codebook.controller');

//Get a list of all products
router.get('/', CodebookController.getCodebook);

//Create a new product
router.post('/', CodebookController.addCodebook);
router.post('/upload', CodebookController.uploadCodebook);

module.exports = router;
