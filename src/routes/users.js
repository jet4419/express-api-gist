const express = require('express');

const userRouter = express.Router();

const dbUser = [
	{
		id: 1,
		name: 'DevJet',
		age: 24,
	},
	{
		id: 2,
		name: 'Ryan',
		age: 32,
	},
	{
		id: 3,
		name: 'Ken',
		age: 17,
	},
	{
		id: 4,
		name: 'Carlo',
		age: 27,
	},
];

userRouter.get('/', (_, res) => {
	res.status(200).json({
		message: 'Success',
		data: dbUser,
	});
});

userRouter.get('/:id', async (req, res) => {
	try {
		const userData = dbUser.find((user) => user.id === Number(req.params.id));

		if (!!userData) {
			res.status(200).json({
				message: 'Success',
				data: userData,
			});
		} else {
			throw 400;
		}
	} catch (error) {
		console.error(error);
		res.status(400).json({
			message: 'Please enter a valid user',
		});
	}
});

module.exports = userRouter;
