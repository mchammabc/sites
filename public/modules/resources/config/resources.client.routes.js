'use strict';

//Setting up route
angular.module('resources').config(['$stateProvider',
	function($stateProvider) {
		// Resources state routing
		$stateProvider.
		state('manageUsers', {
			url: '/manageusers',
			templateUrl: 'modules/resources/views/list-users.client.view.html'
		}).
		state('listResources', {
			url: '/resources',
			templateUrl: 'modules/resources/views/list-resources.client.view.html'
		}).
		state('createResource', {
			url: '/resources/create',
			templateUrl: 'modules/resources/views/create-resource.client.view.html'
		}).
		state('viewResource', {
			url: '/resources/:resourceId',
			templateUrl: 'modules/resources/views/view-resource.client.view.html'
		}).
		state('viewUser', {
			url: '/manageusers/:userId',
			templateUrl: 'modules/resources/views/view-user.client.view.html'
		}).
		state('editUSer', {
			url: '/manageusers/:userId/edit',
			templateUrl: 'modules/resources/views/edit-user.client.view.html'
		}).
		state('editResource', {
			url: '/resources/:resourceId/edit',
			templateUrl: 'modules/resources/views/edit-resource.client.view.html'
		});
	}
]);