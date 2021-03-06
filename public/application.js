'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider','cfpLoadingBarProvider','$translateProvider',
	function($locationProvider,cfpLoadingBarProvider,$translateProvider) {
    // prefix and suffix information  is required to specify a pattern
    // You can simply use the static-files loader with this pattern:
		$translateProvider.useStaticFilesLoader({
        prefix: '/modules/core/i18n/',
        suffix: '.json'
    	});
	    // Since you've now registered more then one translation table, angular-translate has to know which one to use.
	    // This is where preferredLanguage(langKey) comes in.
	    $translateProvider.preferredLanguage('en');

	    // Store the language in the local storage
	    $translateProvider.useLocalStorage();
	
    	$locationProvider.hashPrefix('!');
	    cfpLoadingBarProvider.includeBar = true;
	    cfpLoadingBarProvider.includeSpinner = false;

	}
]);
angular.module(ApplicationConfiguration.applicationModuleName).run(['$rootScope', '$state', '$stateParams',
         function ($rootScope, $state, $stateParams) {

             // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers
             FastClick.attach(document.body);

             // Set some reference to access them from any scope
             $rootScope.$state = $state;
             $rootScope.$stateParams = $stateParams;

             // GLOBAL APP SCOPE
             // set below basic information
             $rootScope.app = {
                 name: 'Yalla', // name of your project
                 author: 'Yalla', // author's name or company name
                 description: 'Angular Bootstrap Admin Template', // brief description
                 version: '1.0', // current version
                 year: ((new Date()).getFullYear()), // automatic current year (for copyright information)
                 isMobile: (function () {// true if the browser is a mobile device
                     var check = false;
                     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                         check = true;
                     };
                     return check;
                 })(),
                 layout: {
                     isNavbarFixed: true, //true if you want to initialize the template with fixed header
                     isSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
                     isSidebarClosed: true, // true if you want to initialize the template with closed sidebar
                     isFooterFixed: false, // true if you want to initialize the template with fixed footer
                     theme: 'theme-1', // indicate the theme chosen for your project
                     logo: 'modules/core/img/logo.png', // relative path of the project logo
                 }
             };
             $rootScope.user = {
                 name: 'Peter',
                 job: 'ng-Dev',
                 picture: 'app/img/user/02.jpg'
             };
         }]);


//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});