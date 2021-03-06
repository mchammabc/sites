'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Customer Schema
 */
var CustomerSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Customer name',
		trim: true
	},
	email: {
		type: String,
		default: '',
		required: 'Please fill email',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	tenantid:{
		type:Number,
		required:true,
		ref:'Tenant'
	}
});

mongoose.model('Customer', CustomerSchema);