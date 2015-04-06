'use strict';

// Configuring the Articles module
angular.module('core').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Pricing', 'pricing', 'item', '/pricing',true);
		Menus.addMenuItem('topbar', 'Typo', 'typography', 'item', '/typography',true);
	}
]);