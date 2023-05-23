// const createError = require('http-errors');
// import { MongoClient } from 'mongodb';

const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
// Replace the uri string with your connection string.
const uri = 'mongodb://mongo_db:27017';
const client = new MongoClient(uri);
const Codebook = require('../models/Codebook.model');

module.exports = {
	getCodebook: async (req, res, next) => {
		try {
			const results = await Codebook.find({}, { __v: 0 });
			// const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
			// const results = await Product.find({ price: 699 }, {});
			res.send(results);
		} catch (error) {
			console.log(error.message);
		}
	},
	addCodebook: async (req, res, next) => {
		try {
			const data = new Codebook(req.body);
			const result = await data.save();
			res.send(result);
		} catch (error) {
			console.log(error.message);

			if (error.name === 'ValidationError') {
				res.status(400).json({
					message: error.message,
				});
				return;
			}
			next(error);
		}
	},
};
