const express = require('express');

const app = express();
const cors = require('cors');

const whitelist = [
	'https://cbmsr.app/',
	'http://localhost:8080/',
	'http://localhost:8000/',
	'http://localhost:3000/',
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

const compression = require('compression');

// Router
const userRouter = require('./routes/users');

require('dotenv').config();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.get('/', (_, res) => {
	res.status(200).json({
		message: 'This is the homepage..',
	});
});

app.use('/users', userRouter);

app.listen(process.env.PORT, () => {
	console.log('Server is listening to PORT:', process.env.PORT);
});
