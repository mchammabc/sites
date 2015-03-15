'use strict';

//Projects service used to communicate Projects REST endpoints
angular.module('projects').factory('Projects', ['$resource',
	function($resource) {
	 console.log('in factory',$resource);
		return $resource('projects/:projectId', { projectId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},
			createInit:{method:'GET',params:{},url:'projects/create',isArray:true}
		});
	}
]);