'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Customer = mongoose.model('Customer'),
	_ = require('lodash');

/**
 * Create a Customer
 */
exports.create = function(req, res) {
	if(req.session.tenantid)
	{
		var customer = new Customer(req.body);
		customer.user = req.user;
		customer.tenantid = req.session.tenantid;
		customer.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(customer);
			}
		});
	}
};

/**
 * Show the current Customer
 */
exports.read = function(req, res) {
		console.log('Read customer');
		res.jsonp(req.customer);

};

/**
 * Update a Customer
 */
exports.update = function(req, res) {
	var customer = req.customer ;

	customer = _.extend(customer , req.body);

	customer.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(customer);
		}
	});
};

/**
 * Delete an Customer
 */
exports.delete = function(req, res) {
	var customer = req.customer ;
	customer.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(customer);
		}
	});
};

/**
 * List of Customers
 */
exports.list = function(req, res) { 
	Customer.find({'tenantid':req.session.tenantid}).sort('-created').populate('user', 'displayName').exec(function(err, customers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log('Customers',customers);
			res.jsonp(customers);
		}
	});
};

/**
 * Customer middleware
 */
exports.customerByID = function(req, res, next, id,router) { 
	console.log('Find customerbyid');
	Customer.findById(id).populate('user', 'displayName').exec(function(err, customer) {
		if (err) return next(err);
		if (! customer) return next(new Error('Failed to load Customer ' + id));
		if(customer)
		{
			if(customer.tenantid===req.session.tenantid){
				console.log('Find customerbyid tenant',customer.tenantid,req.session.tenantid);
				customer.tenantid=undefined;
				req.customer = customer;
				next();
			}
			else{
				return res.status(404).send('Sorry, we cannot find that!');
				
			}
		}
	});
};

/**
 * Customer authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.customer.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
