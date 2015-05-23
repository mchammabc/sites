'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Resource Schema
 */
var ResourceSchema = new Schema({
	firstName: {
		type: String,
		default: '',
		required: 'Please fill Resource First Name',
		trim: true
	},
	lastName: {
		type: String,
		default: '',
		trim: true
	},
	email: {
		type: String,
		trim: true,
		default: '',
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	comments: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Resource', ResourceSchema);