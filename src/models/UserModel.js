const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
	{
		name: String,
		age: Number,
		location: String,
	},
	{ timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
