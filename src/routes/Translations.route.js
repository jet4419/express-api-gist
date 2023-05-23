const express = require('express');
const router = express.Router();

// const PlayController = require('../Controllers/Product.Controller');
const TranslationsController = require('../controllers/Translations.controller');

//Get a list of all products
router.get('/', TranslationsController.getTranslations);

//Create a new product
router.post('/', TranslationsController.addTranslations);

module.exports = router;
