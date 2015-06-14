'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Resource = mongoose.model('Resource'),
	User = mongoose.model('User'),
	_ = require('lodash');

/**
 * Create a Resource
 */
exports.create = function(req, res) {
	var resource = new Resource(req.body);
	console.log('Create Resource',req.body,req.session.tenantid)
	resource.user = req.user;
	resource.tenantid = req.session.tenantid;
	resource.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} 
		else 
		{
			if(req.body.loginaccess===true){
			var user = new User();
			user.firstName = req.body.firstName;
			user.lastName = req.body.lastName;
			user.email = req.body.email;
			user.displayName = req.body.firstName + ' ' + req.body.lastName;
			user.username = req.body.username;
			user.password = req.body.password;
			user.tenantid = req.session.tenantid;
			user.provider = 'local';
			user.role = req.body.role;
			user.save(function(err) {
				if (err) {
					console.log('Error',err)
					res.status(400).send(err);
				}
				else{				
					res.jsonp(resource);
				}			
			});
			}
			else{
				res.jsonp(resource);
			}
		}
	});
};

/**
 * Show the current Resource
 */
exports.read = function(req, res) {
	console.log('In read',req.resource);
	res.jsonp(req.resource);
};

/**
 * Update a Resource
 */
exports.update = function(req, res) {
	var resource = req.resource ;

	resource = _.extend(resource , req.body);

	resource.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(resource);
		}
	});
};

/**
 * Delete an Resource
 */
exports.delete = function(req, res) {
	var resource = req.resource ;

	resource.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(resource);
		}
	});
};

/**
 * List of Resources
 */
exports.list = function(req, res) { 
	Resource.find().sort('-created').populate('user', 'displayName').exec(function(err, resources) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(resources);
		}
	});
};

/**
 * List of Users
 */
exports.userlist = function(req, res) { 
	User.find().sort('-created').populate('user', 'displayName').exec(function(err, resources) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(resources);
		}
	});
};

/**
 * Resource middleware
 */
exports.resourceByID = function(req, res, next, id) { 
	console.log('RESOURCE ID',id);
	Resource.findById(id).populate('user', 'displayName').exec(function(err, resource) {
		if (err) return next(err);
		if (! resource) return next(new Error('Failed to load Resource ' + id));
		req.resource = resource ;
		next();
	});
};

/**
 * Resource middleware
 */
exports.userByID = function(req, res, next, id) { 
	console.log('USER ID',id);
	User.findById(id).populate('user', 'displayName').exec(function(err, resource) {
		if (err) return next(err);
		if (! resource) return next(new Error('Failed to load Resource ' + id));
		req.resource = resource ;
		next();
	});
};

/**
 * Resource authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.resource.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
