'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	autoIncrement = require('mongoose-auto-increment'),
	Schema = mongoose.Schema;

/**
 * Tenant Schema
 */
var TenantSchema = new Schema({
	ipaddress: {
		type: String,
		default: '',
		required: true,
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
	}/*,
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
	*/
});

TenantSchema.plugin(autoIncrement.plugin,'Tenant');
mongoose.model('Tenant', TenantSchema);