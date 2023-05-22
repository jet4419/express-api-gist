const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaySchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
});

const Play = mongoose.model('play', PlaySchema);
module.exports = Play;
