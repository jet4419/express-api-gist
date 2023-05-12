const express = require('express');

const app = express();
const cors = require('cors');
const compression = require('compression');

// Router
const userRouter = require('./routes/users');

require('dotenv').config();

app.use(cors());
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
