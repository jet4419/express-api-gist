// const createError = require('http-errors');
// import { MongoClient } from 'mongodb';

const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
// Replace the uri string with your connection string.
// const uri = 'mongodb://mongo_db:27017';
const uri = 'mongodb://mongo_db:27017';
const client = new MongoClient(uri);
const Codebook = require('../models/Codebook.model');
const db = client.db('cbms-resources');

const collection = db.collection('2023_codebook');
// const data = await commonOcc.find().toArray();

module.exports = {
	uploadCodebook: async (req, res, next) => {
		try {
			console.log('req.body:');
			console.log(req.body);
			console.log('req.body.end:');
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
	getCodebook: async (req, res, next) => {
		try {
			// const results = await Codebook.find({}, { __v: 0, _id: 0 });
			// const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
			// const results = await Product.find({ price: 699 }, {});
			const results = await collection.find({}, { __v: 0, _id: 0 }).toArray();

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
