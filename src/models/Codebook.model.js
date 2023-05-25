const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodebookSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
});

const Codebook = mongoose.model('2023_codebook', CodebookSchema);

module.exports = Codebook;
