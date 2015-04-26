'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Contact Schema
 */
var ContactSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Contact name',
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

mongoose.model('Contact', ContactSchema);