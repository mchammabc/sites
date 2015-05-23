'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');


/**
 * Create a Customer
 */
exports.create = function(req, res) {
	if(req.session.tenantid)
	{
		console.log('In User CREATE');
		var user = new User(req.body);
		//user.user = req.user;
		user.displayName = user.firstName + ' ' + user.lastName;
		user.email = req.session.tenantid;
		user.tenantid = req.session.tenantid;
		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(user);
			}
		});
	}
};


