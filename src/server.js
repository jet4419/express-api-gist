const express = require('express');
const User = require('./models/UserModel');
const Codebook = require('./models/Codebook.model');
const app = express();
const compression = require('compression');

const cors = require('cors');

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

require('./initDB')();

app.get('/', (req, res) => {
	res.send('Hello NODE API');
});

// const PlayRoute = require('./routes/Play.route');
// app.use('/plays', PlayRoute);

const CodebookRoute = require('./routes/Codebook.route');
app.use('/codebook', CodebookRoute);

const TranslationsRoute = require('./routes/Translations.route');
app.use('/translations', TranslationsRoute);

const PORT = 3000;

app.listen(PORT, () => {
	console.log('App is running at:', PORT);
});
