const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/UserModel');
const Codebook = require('./models/Codebook.model');
const app = express();
const compression = require('compression');

const cors = require('cors');

// MongoClient
const { MongoClient } = require('mongodb');
// Replace the uri string with your connection string.
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const database = client.db('apptest');
//

const whitelist = [
	'https://cbmsr.app/',
	'https://cbmsr.psa.gov.ph/',
	'http://localhost:8080',
	'http://localhost:8000',
	'http://localhost:3000',
	'http://localhost:8005',
	'http://localhost:5173',
];

const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};

//routes

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

app.get('/', (req, res) => {
	res.send('Hello NODE API');
});

const PlayRoute = require('./routes/Play.route');
app.use('/plays', PlayRoute);

app.get('/common-occupation', async (req, res) => {
	try {
		const commonOcc = database.collection('common-occupation');
		const data = await commonOcc.find().toArray();

		res.status(200).json({
			message: 'OK',
			data: data,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
});

app.get('/psoc', async (req, res) => {
	try {
		const commonOcc = database.collection('psoc');
		const data = await commonOcc.find().toArray();

		res.status(200).json({
			message: 'OK',
			data: data,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
});

app.get('/codebook', async (req, res) => {
	try {
		// const database = client.db('apptest');

		const codebook = database.collection('2023_codebook');
		// console.log('codebook');
		// console.log(codebook);
		// console.log('!_______________________________________________________!');
		const codes = await codebook.find().toArray();
		// Query for a movie that has the title 'Back to the Future'
		// const query = { title: 'Back to the Future' };
		// const codes = await codebook.find();
		// console.log(codes);
		res.status(200).json({
			message: 'OK',
			data: codes,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
	// finally {
	// 	// Ensures that the client will close when you finish/error
	// 	await client.close();
	// }

	// try {
	// 	const codebook = await Codebook.find();
	// 	res.send(200).json({
	// 		message: 'OK',
	// 		data: codebook,
	// 	});
	// } catch (error) {
	// 	res.send(500).json({
	// 		message: error.message,
	// 	});
	// }
});

app.get('/translations', async (req, res) => {
	try {
		const translations = database.collection('translations');

		const data = await translations.find().toArray();

		res.status(200).json({
			message: 'OK',
			data: data,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
});

app.get('/users', async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json({
			message: 'OK',
			data: users,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
});

app.post('/users', async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(201).json(user);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
});

mongoose.set('strictQuery', false);
mongoose
	.connect('mongodb://localhost:27017/apptest')
	.then(() => {
		console.log('connected to MongoDB');
		app.listen(3000, () => {
			console.log(`Node API app is running on port 3000`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
