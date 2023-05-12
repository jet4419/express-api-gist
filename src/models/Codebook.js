const mongoose = require('mongoose');

const CodebookSchema = mongoose.Schema(
	{
		id: String,
		items: Object,
		heading: Array,
		section: String,
		form: String,
	},
	{ timestamps: true }
);

const Codebook = mongoose.model('2023_codebook', CodebookSchema);

module.exports = Codebook;
