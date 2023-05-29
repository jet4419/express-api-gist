// import mysql from 'mysql2';
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = mysql
	.createPool({
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE,
	})
	.promise();

async function getUsers() {
	// console.log('pool');
	// pool.then((res) => console.log('res:', res)).catch((e) => console.error(e));
	// console.log(pool);

	const result = await pool.query(
		'SELECT id, first_name, last_name, username, email FROM users'
	);
	return result[0];
}

async function getUser(email) {
	// console.log('pool');
	// pool.then((res) => console.log('res:', res)).catch((e) => console.error(e));
	// console.log(pool);

	const result = await pool.query(
		'SELECT id, first_name, last_name, username, email, password FROM users WHERE email = ?',
		[email]
	);

	return result[0];
}

async function addUser(
	firstName,
	lastName,
	username,
	email,
	password,
	emailValidated,
	active
) {
	const hashedPassword = await bcrypt.hash(password, 10);
	const res = await pool.query(
		`INSERT INTO users (first_name, last_name, username, email, password, email_validated, active) VALUES(?, ?, ?, ?, ?, ?, ?)`,
		[
			firstName,
			lastName,
			username,
			email,
			hashedPassword,
			emailValidated,
			active,
		]
	);
	return res;
}

module.exports = { getUsers, getUser, addUser };
