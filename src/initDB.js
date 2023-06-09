const mongoose = require('mongoose');

module.exports = () => {
	mongoose.set('strictQuery', false);
	mongoose
		.connect('mongodb://mongo_db:27017/cbms-resources')
		.then(() => {
			console.log('connected to MongoDB');
			// app.listen(3000, () => {
			// 	console.log(`Node API app is running on port 3000`);
			// });
		})
		.catch((error) => {
			console.log(error);
		});
};

// module.exports = () => {
// 	mongoose
// 		.connect(process.env.MONGODB_URI, {
// 			dbName: process.env.DB_NAME,
// 			user: process.env.DB_USER,
// 			pass: process.env.DB_PASS,
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 			useFindAndModify: false,
// 		})
// 		.then(() => {
// 			console.log('Mongodb connected....');
// 		})
// 		.catch((err) => console.log(err.message));

// 	mongoose.connection.on('connected', () => {
// 		console.log('Mongoose connected to db...');
// 	});

// 	mongoose.connection.on('error', (err) => {
// 		console.log(err.message);
// 	});

// 	mongoose.connection.on('disconnected', () => {
// 		console.log('Mongoose connection is disconnected...');
// 	});

// 	process.on('SIGINT', () => {
// 		mongoose.connection.close(() => {
// 			console.log(
// 				'Mongoose connection is disconnected due to app termination...'
// 			);
// 			process.exit(0);
// 		});
// 	});
// };
