'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Time Schema
 */
var TimeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Time name',
		trim: true
	},
	startclock: {
		type: Date,
		default: Date.now
	},
	customer:{
		type: Schema.ObjectId,
		ref: 'Customer'
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

mongoose.model('Time', TimeSchema);