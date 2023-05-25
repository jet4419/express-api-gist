// const createError = require('http-errors');
// import { MongoClient } from 'mongodb';

const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
// Replace the uri string with your connection string.
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const Translations = require('../models/Translations.model');
const db = client.db('cbms-resources');

const collection = db.collection('translations');

module.exports = {
	uploadTranslations: async (req, res, next) => {
		try {
			const userReq = req.body;

			collection.insertOne(userReq, (err, result) => {
				if (err) {
					console.log(err);
					next(err);
				}
				console.log('Document inserted successfully');
			});
			// const data = new Codebook(req.body);
			// const result = await data.save();
			res.send(userReq);
		} catch (error) {
			console.log('deym');
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
	getTranslations: async (req, res, next) => {
		try {
			const results = await collection.find({}, { __v: 0, _id: 0 }).toArray();
			// const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
			// const results = await Product.find({ price: 699 }, {});
			res.send(results);
		} catch (error) {
			console.log(error.message);
		}
	},
	addTranslations: async (req, res, next) => {
		try {
			const data = new Translations(req.body);
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
