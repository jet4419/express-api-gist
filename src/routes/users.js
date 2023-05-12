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

userRouter.post('/', async (req, res) => {
	try {
		const userData = req.body;
		dbUser.push(userData);
		res.status(200).json({
			message: 'Data added successfully',
			data: dbUser,
		});
	} catch (error) {
		console.log(error.message);
		res.status(400).json({
			message: error.message,
		});
	}
});

userRouter.patch('/:id', (req, res) => {
	try {
		const userIndex = dbUser.findIndex(
			(user) => user.id === Number(req.params.id)
		);
		const userData = req.body;

		console.log(userIndex);

		if (userIndex !== -1) {
			dbUser[userIndex] = userData;

			res.status(200).json({
				message: 'Data updated successfully',
				data: dbUser[userIndex],
			});
		} else {
			throw 400;
		}
	} catch (error) {
		res.status(400).json({
			message: 'Please enter a valid user',
		});
	}
});

userRouter.delete('/:id', (req, res) => {
	try {
		const userIndex = dbUser.findIndex(
			(user) => user.id === Number(req.params.id)
		);
		if (userIndex !== -1) {
			dbUser.splice(userIndex, 1);
			res.status(200).json({
				message: 'Data deleted successfully',
				data: dbUser,
			});
		} else {
			throw 400;
		}
	} catch (error) {
		res.status(400).json({
			message: 'Please enter a valid user',
		});
	}
});

module.exports = userRouter;
