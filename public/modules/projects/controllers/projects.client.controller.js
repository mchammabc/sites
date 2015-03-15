'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects',
	function($scope, $stateParams, $location, Authentication, Projects) {
		$scope.authentication = Authentication;
		//$scope.customers = ['Maher','Louay'];
		// Create new Project
		$scope.create = function() {
			// Create new Project object
			var project = new Projects ({
				name: this.name,
				email:this.email
			});
			
			// Redirect after save
			project.$save(function(response) {
				$location.path('projects/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			console.log($scope);
		};

		// Remove existing Project
		$scope.remove = function(project) {
			if ( project ) { 
				project.$remove();

				for (var i in $scope.projects) {
					if ($scope.projects [i] === project) {
						$scope.projects.splice(i, 1);
					}
				}
			} else {
				$scope.project.$remove(function() {
					$location.path('projects');
				});
			}
		};

		// Update existing Project
		$scope.update = function() {
			var project = $scope.project;

			project.$update(function() {
				$location.path('projects/' + project._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Projects
		$scope.find = function() {
		
		     var qProjects = Projects.query()
		     console.log('now were cooking 3',qProjects);
			$scope.projects = qProjects;
		};

		// Find existing Project
		$scope.findOne = function() {
			console.log('now were cooking 2',Projects);
			$scope.project = Projects.get({ 
				projectId: $stateParams.projectId
			});
		};
		$scope.createInit = function() {
			console.log('now were cooking');
			var customers = Projects.createInit();
			console.log('now were cooking', customers);
			$scope.customers = customers;
		};
	}
]);