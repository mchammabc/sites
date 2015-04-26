'use strict';

// Projects controller
angular.module('projects').controller('ProjectsDateController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects',
	function($scope, $stateParams, $location, Authentication, Projects) {
	   $scope.today = function () {
	        $scope.dt = new Date();
	    };
	    $scope.today();

	    $scope.clear = function () {
	        $scope.dt = null;
	    };

	    // Disable weekend selection
	    $scope.disabled = function (date, mode) {
	        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
	    };

	    $scope.toggleMin = function () {
	        $scope.minDate = $scope.minDate ? null : new Date();
	    };
	    $scope.toggleMin();

	    $scope.open = function ($event) {
	        $event.preventDefault();
	        $event.stopPropagation();

	        $scope.opened = !$scope.opened;
	    };
	    $scope.endOpen = function ($event) {
	        $event.preventDefault();
	        $event.stopPropagation();
	        $scope.startOpened = false;
	        $scope.endOpened = !$scope.endOpened;
	    };
	    $scope.startOpen = function ($event) {
	        $event.preventDefault();
	        $event.stopPropagation();
	        $scope.endOpened = false;
	        $scope.startOpened = !$scope.startOpened;
	    };

	    $scope.dateOptions = {
	        formatYear: 'yy',
	        startingDay: 1
	    };

	    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate','M/dd/yyyy'];
	    $scope.format = $scope.formats[4];

	    $scope.hstep = 1;
	    $scope.mstep = 15;

	    // Time Picker
	    $scope.options = {
	        hstep: [1, 2, 3],
	        mstep: [1, 5, 10, 15, 25, 30]
	    };

	    $scope.ismeridian = true;
	    $scope.toggleMode = function () {
	        $scope.ismeridian = !$scope.ismeridian;
	    };

	    $scope.update = function () {
	        var d = new Date();
	        d.setHours(14);
	        d.setMinutes(0);
	        $scope.dt = d;
	    };

	    $scope.changed = function () {
	        $log.log('Time changed to: ' + $scope.dt);
	    };

	    $scope.clear = function () {
	        $scope.dt = null;
	    };
	}
]);