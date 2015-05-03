'use strict';

// Customers controller
angular.module('customers').controller('CustomersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Customers','$filter','ngTableParams',
	function($scope, $stateParams, $location, Authentication, Customers,$filter,ngTableParams) {
		$scope.authentication = Authentication;	

		// Create new Customer
		$scope.create = function() {
			// Create new Customer object
			var customer = new Customers ({
				name: this.name,
				email: this.email
			});

			// Redirect after save
			customer.$save(function(response) {
				$location.path('customers/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Customer
		$scope.remove = function(customer) {
			if ( customer ) { 
				customer.$remove();

				for (var i in $scope.customers) {
					if ($scope.customers [i] === customer) {
						$scope.customers.splice(i, 1);
					}
				}
			} else {
				$scope.customer.$remove(function() {
					$location.path('customers');
				});
			}
		};

		// Update existing Customer
		$scope.update = function() {
			var customer = $scope.customer;

			customer.$update(function() {
				$location.path('customers/' + customer._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Customers
		$scope.find = function() {			
			$scope.customers = Customers.query().$promise.then(function (data){

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
			
			
		}
		// Find existing Customer
		$scope.findOne = function() {
			Customers.get({ 
				customerId: $stateParams.customerId
			},function (customer){
				console.log("Resp",customer);
				$scope.customer = customer
				
			}, function (error){
				$scope.customer = error
				console.log("Resp Err",error);
				});
			
		};
	}
]);

'use strict';

angular.module('customers').controller('ngTableCtrl7', ["$scope", "$filter", "ngTableParams", function ($scope, $filter, ngTableParams) {

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
        	console.log('Params',params.page(),params.count());
            var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));

        }

    });

    $scope.editId = -1;

    $scope.setEditId = function (pid) {

        $scope.editId = pid;

    };

}]);


//Customers controller
angular.module('customers').controller('CustomersTestController', ['$scope', '$stateParams', '$location', 'Authentication', 'Customers','$filter','ngTableParams',
	function($scope, $stateParams, $location, Authentication, Customers,$filter,ngTableParams) {
	
			var data = [{
		    "name":"Maher",
		    "email":"maher.chamma@gmail.com",
		    "created":"5/1/2015"
		    }];

		    $scope.tableParams = new ngTableParams({
		        page: 1,            // show first page
		        count: 10        // count per pa
		    },
		        {
		        	total: data.length, // length of data
		            getData: function($defer, params) {
		                var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
		                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		            }
		        });
}
	
]);