'use strict';

// Resources controller
angular.module('resources').controller('ResourcesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Resources','$filter','ngTableParams',
	function($scope, $stateParams, $location, Authentication, Resources,$filter,ngTableParams) {
		$scope.authentication = Authentication;
		$scope.formData = {"firstName":'',"password":'',"reenterpassword":''};
		console.log('Form Data Test',$scope.formData);
		console.log('User Test',user.role[0]);
		$scope.roles = [{'role':'Administrator'},{'role':'Project Manager'},{'role':'Resource'}];
		// Create new Resource
		$scope.create = function() {
			// Create new Resource object
			var resource = new Resources ({
				firstName: this.formData.firstname,
				lastName: this.formData.lastname,
				email: this.formData.email,
				comments: this.formData.comments,
				jobtitle: this.formData.jobtitle,
				isactive: this.formData.isactive,
				username: this.formData.username,
				loginaccess: this.formData.loginaccess,
				password: this.formData.password,
				role: this.formData.role.role
				
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
				$scope.resourceform.reenterpassword.$setValidity('required',false)
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
		// Find a list of Resources
		$scope.findUsers = function() {
			console.log('IN findusers')
			$scope.resources = Resources.findUsers().$promise.then(function (data){
				console.log(data)
			    $scope.tableParams = new ngTableParams({
			        page: 1,            // show first page
			        count: 10        // count per pa
			    },
			        {
			        	total: data.length, // length of data
			        	counts:[],
			            getData: function($defer, params) {
			                var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
			                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
			            }
			        });
			
			});
		};
		// Find existing Resource
		$scope.findOne = function() {
			$scope.resource = Resources.get({ 
				resourceId: $stateParams.resourceId
			});
		};
		// Find existing User
		$scope.findOneUser = function() {
			$scope.resource = Resources.findOneUser({userId: $stateParams.userId});
		};
		// Find existing Resource
		$scope.navigate = function(path) {
			console.log("Navigate?",path)
			$location.path(path);
		};
	}
]);