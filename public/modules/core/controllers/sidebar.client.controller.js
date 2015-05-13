'use strict';

angular.module('core').controller('SidebarController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		console.log('Test',Authentication)
		$scope.isCollapsed = true;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = $scope.isCollapsed;
		};
		$scope.roleroutes = {"Customer":{"Administrator":true,"Project Manager":true,"Resource":false}}
		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = true;
		});
	}
]);