const { addUser, getUser } = require('../database.js');

const bcrypt = require('bcrypt');
const validator = require('validator');

const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
	const { firstName, lastName, username, email, password } = req.body;

	await addUser(firstName, lastName, username, email, password);

	res.status(201).json({
		message: 'User successfully registered.',
	});
};

exports.login = async (req, res) => {
	// res.setHeader('Referrer-Policy', 'no-referrer');
	// res.setHeader('Access-Control-Allow-Credentials', 'true');

	const { email, password } = req.body;

	const user = await getUser(email, password);

	// console.log('user password');
	// console.log(user[0].password);
	console.log('user:');
	console.log(user);

	if (user.length > 0) {
		bcrypt.compare(password, user[0].password, function (err, result) {
			console.log('err: ');
			console.log(err);
			console.log('result: ');
			console.log(result);
			if (err) {
				res.status(500).json({
					message: "There's some server downtime.. please try again.",
					error: err.message,
				});
			} else if (result === false) {
				res.status(200).json({
					message: 'Please enter a valid email or password',
					auth: result,
				});
			} else if (
				validator.isEmail(email) &&
				validator.isStrongPassword(password) &&
				result
			) {
				const { id } = user[0];
				const token = jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, {
					expiresIn: process.env.JWT_EXPIRES_IN,
				});

				const cookieOptions = {
					expires: new Date(
						Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
					),
					httpOnly: true,
				};

				res.cookie('jwt', token, cookieOptions);
				console.log('deymmmmnnnnnnnnnnnnnnn');
				// res.status(200).redirect('/');
				// res.status(200).redirect('/');
				res.status(200).json({
					message: 'User logged in successfully.',
					auth: result,
				});
			}
		});
	} else {
		res.status(401).json({
			message: 'Please enter a valid user',
		});
	}
};
