const mongoose = require('mongoose');
const { Schema } = mongoose;

main()
	.then((res) => {
		console.log('okay');
		console.log(res);
	})
	.catch((err) => console.log(err));

async function main() {
	await mongoose.connect('mongodb://localhost:27017');

	// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const UserSchema = new Schema(
	{
		name: String,
		age: Number,
		location: String,
	},
	{ timestamps: true }
);

const User = mongoose.model('User', UserSchema);

async function addUser() {
	try {
		let doc = await User.create({
			name: 'testconnection',
			age: 34,
			location: 'PH',
		});

		await doc.save();
	} catch (error) {
		console.log(error.message);
	}
}

addUser();
