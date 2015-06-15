'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var times = require('../../app/controllers/times.server.controller');

	// Times Routes
	
	// Projects Routes
	app.route('/time/create')
		.get(times.createinit);
	
	app.route('/times')
		.get(times.list)
		.post(users.requiresLogin, times.create);

	app.route('/times/:timeId')
		.get(times.read)
		.put(users.requiresLogin, times.hasAuthorization, times.update)
		.delete(users.requiresLogin, times.hasAuthorization, times.delete);

	// Finish by binding the Time middleware
	app.param('timeId', times.timeByID);
};
