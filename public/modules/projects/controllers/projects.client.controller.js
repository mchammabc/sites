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
				email:this.email,
				customer:this.customer
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
		     var qProjects = Projects.query();
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
			var customers = Projects.createInit();
			$scope.customers = customers;
			$scope.projectstatus = [{'status':'In Progress'},{'status':'Not Started'},{'status':'Completed'},{'status':'On Hold'}];
		};
	}
]);

'use strict';

//Projects controller
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

angular.module('projects').controller('ngTableCtrl6', ["$scope", "$filter", "ngTableParams", function ($scope, $filter, ngTableParams) {

    var data = [{

        "id": 1,
        "lm": 138661285100,
        "ln": "Smith",
        "fn": "John",
        "dc": "CEO",
        "em": "j.smith@company.com",
        "ph": "617-321-4567",
        "ac": true,
        "dl": false

    }, {

        "id": 2,
        "lm": 138661285200,
        "ln": "Taylor",
        "fn": "Lisa",
        "dc": "VP of Marketing",
        "em": "l.taylor@company.com",
        "ph": "617-522-5588",
        "ac": true,
        "dl": false

    }, {

        "id": 3,
        "lm": 138661285300,
        "ln": "Jones",
        "fn": "James",
        "dc": "VP of Sales",
        "em": "j.jones@company.com",
        "ph": "617-589-9977",
        "ac": true,
        "dl": false

    }, {

        "id": 4,
        "lm": 138661285400,
        "ln": "Wong",
        "fn": "Paul",
        "dc": "VP of Engineering",
        "em": "p.wong@company.com",
        "ph": "617-245-9785",
        "ac": true,
        "dl": false

    }, {

        "id": 5,
        "lm": 138661285500,
        "ln": "King",
        "fn": "Alice",
        "dc": "Architect",
        "em": "a.king@company.com",
        "ph": "617-244-1177",
        "ac": true,
        "dl": false

    }, {

        "id": 6,
        "lm": 138661285600,
        "ln": "Brown",
        "fn": "Jan",
        "dc": "Software Engineer",
        "em": "j.brown@company.com",
        "ph": "617-568-9863",
        "ac": true,
        "dl": false

    }, {

        "id": 7,
        "lm": 138661285700,
        "ln": "Garcia",
        "fn": "Ami",
        "dc": "Software Engineer",
        "em": "a.garcia@company.com",
        "ph": "617-327-9966",
        "ac": true,
        "dl": false

    }, {

        "id": 8,
        "lm": 138661285800,
        "ln": "Green",
        "fn": "Jack",
        "dc": "Software Engineer",
        "em": "j.green@company.com",
        "ph": "617-565-9966",
        "ac": true,
        "dl": false

    }, {

        "id": 9,
        "lm": 138661285900,
        "ln": "Liesen",
        "fn": "Abraham",
        "dc": "Plumber",
        "em": "a.liesen@company.com",
        "ph": "617-523-4468",
        "ac": true,
        "dl": false

    }, {

        "id": 10,
        "lm": 138661286000,
        "ln": "Bower",
        "fn": "Angela",
        "dc": "Product Manager",
        "em": "a.bower@company.com",
        "ph": "617-877-3434",
        "ac": true,
        "dl": false

    }, {

        "id": 11,
        "lm": 138661286100,
        "ln": "Davidoff",
        "fn": "Fjodor",
        "dc": "Database Admin",
        "em": "f.davidoff@company.com",
        "ph": "617-446-9999",
        "ac": true,
        "dl": false

    }, {

        "id": 12,
        "lm": 138661286200,
        "ln": "Vitrovic",
        "fn": "Biljana",
        "dc": "Director of Communications",
        "em": "b.vitrovic@company.com",
        "ph": "617-111-1111",
        "ac": true,
        "dl": false

    }, {

        "id": 13,
        "lm": 138661286300,
        "ln": "Valet",
        "fn": "Guillaume",
        "dc": "Software Engineer",
        "em": "g.valet@company.com",
        "ph": "617-565-4412",
        "ac": true,
        "dl": false

    }, {

        "id": 14,
        "lm": 138661286400,
        "ln": "Tran",
        "fn": "Min",
        "dc": "Gui Designer",
        "em": "m.tran@company.com",
        "ph": "617-866-2554",
        "ac": true,
        "dl": false

    }];
    $scope.tableParams = new ngTableParams({

        page: 1,
        count: 10

    }, {

        total: data.length,
        getData: function ($defer, params) {
        	console.log('Params',params)
            var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));

        }

    });

    $scope.editId = -1;

    $scope.setEditId = function (pid) {

        $scope.editId = pid;

    };

}]);
