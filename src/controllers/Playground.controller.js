// const createError = require('http-errors');
const mongoose = require('mongoose');

const Play = require('../models/Play.model');

module.exports = {
	getAllPlays: async (req, res, next) => {
		try {
			const results = await Play.find({}, { __v: 0 });
			// const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
			// const results = await Product.find({ price: 699 }, {});
			res.send(results);
		} catch (error) {
			console.log(error.message);
		}
	},

	createNewPlay: async (req, res, next) => {
		try {
			const play = new Play(req.body);
			const result = await play.save();
			res.send(result);
		} catch (error) {
			console.log(error.message);
			if (error.name === 'ValidationError') {
				// next(createError(422, error.message));
				res.status(400).json({
					message: error.message,
				});
				return;
			}
			next(error);
		}

		/*Or:
  If you want to use the Promise based approach*/
		/*
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err.message);
    }); 
    */
	},
};
