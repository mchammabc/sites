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
		required: 'Please fill Resource Last Name',
		trim: true
	},
	email: {
		type: String,
		trim: true,
		required: 'Please fill Resource Email',
		default: '',
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	jobtitle: {
		type: String,
		default: '',
		trim: true
	},
	isactive: {
		type: Boolean, default: true 
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
	},
	tenantid:{
		type:Number,
		required:true,
		ref:'Tenant'
	}
});

mongoose.model('Resource', ResourceSchema);