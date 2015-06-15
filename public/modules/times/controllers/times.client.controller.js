'use strict';

// Times controller
angular.module('times').controller('TimesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Times','$filter','ngTableParams',
	function($scope, $stateParams, $location, Authentication, Times,$filter,ngTableParams) {
		$scope.authentication = Authentication;
		$scope.formData = {};
		// Create new Time
		$scope.create = function() {
			console.log('Client Time',$scope.formData)
			// Create new Time object
			var time = new Times ({
				name: this.formData.name,
				customer:this.formData.customer.selected._id
			});
			
			// Redirect after save
			time.$save(function(response) {
				$location.path('times/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Time
		$scope.remove = function(time) {
			if ( time ) { 
				time.$remove();

				for (var i in $scope.times) {
					if ($scope.times [i] === time) {
						$scope.times.splice(i, 1);
					}
				}
			} else {
				$scope.time.$remove(function() {
					$location.path('times');
				});
			}
		};

		// Update existing Time
		$scope.update = function() {
			
			var time = $scope.time;
			console.log('Update',time,this)
			time.$update(function() {
				$location.path('times/' + time._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		$scope.createInit = function() {
			var customers = Times.createInit();
			$scope.customers = customers;
		};

		// Find a list of Times
		$scope.find = function() {
			$scope.times = Times.query();
		};

		// Find existing Time
		$scope.findOne = function() {
			$scope.time = Times.get({ 
				timeId: $stateParams.timeId
			});
			console.log('Time find one',$scope.time)
		};
	}
]);