'use strict';

// Resources controller
angular.module('resources').controller('ResourcesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Resources',
	function($scope, $stateParams, $location, Authentication, Resources) {
		$scope.authentication = Authentication;
		$scope.formData = {"firstName":'',"password":'',"reenterpassword":''};
		console.log('Form Data Test',$scope.formData);
		console.log('User Test',user.role[0]);
		$scope.roles = [{'role':'Administrator'},{'role':'Project Manager'},{'role':'Resource'}];
		// Create new Resource
		$scope.create = function() {
			// Create new Resource object
			var resource = new Resources ({
				firstName: this.firstname,
				lastName: this.lastname,
				email: this.email,
				comments: this.comments
			});

			// Redirect after save
			resource.$save(function(response) {
				$location.path('resources/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Resource
		$scope.remove = function(resource) {
			if ( resource ) { 
				resource.$remove();

				for (var i in $scope.resources) {
					if ($scope.resources [i] === resource) {
						$scope.resources.splice(i, 1);
					}
				}
			} else {
				$scope.resource.$remove(function() {
					$location.path('resources');
				});
			}
		};

		$scope.validatePassword = function() {
			if($scope.formData.password===$scope.formData.reenterpassword)
			{
				console.log('validatePassword has triggered','is valid');
			}
			else{
				$scope.formData.reenterpassword.$setValidity('required',false)
				console.log('else check',$scope.formData.password,$scope.formData.reenterpassword,$scope.formData,$scope);
			}
		};
		
		// Update existing Resource
		$scope.update = function() {
			var resource = $scope.resource;

			resource.$update(function() {
				$location.path('resources/' + resource._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Resources
		$scope.find = function() {
			$scope.resources = Resources.query();
		};

		// Find existing Resource
		$scope.findOne = function() {
			$scope.resource = Resources.get({ 
				resourceId: $stateParams.resourceId
			});
		};
	}
]);