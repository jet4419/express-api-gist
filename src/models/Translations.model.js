const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TranslationsSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
});

const Translations = mongoose.model('translations', TranslationsSchema);

module.exports = Translations;
