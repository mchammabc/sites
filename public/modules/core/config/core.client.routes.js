'use strict';


// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES',
	function($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('pricing', {
			url: '/pricing',
			templateUrl: 'modules/core/views/pricing.client.view.html'
		}).
		state('typography', {
			url: '/typography',
			templateUrl: 'modules/core/views/ui_typography.html'
		});
	    // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)
	    function loadSequence() {
	        var _args = arguments;
	        return {
	            deps: ['$ocLazyLoad', '$q',
				function ($ocLL, $q) {
				    var promise = $q.when(1);
				    for (var i = 0, len = _args.length; i < len; i++) {
				        promise = promiseThen(_args[i]);
				    }
				    return promise;

				    function promiseThen(_arg) {
				        if (typeof _arg == 'function')
				            return promise.then(_arg);
				        else
				            return promise.then(function () {
				                var nowLoad = requiredData(_arg);
				                if (!nowLoad)
				                    return $.error('Route resolve: Bad resource name [' + _arg + ']');
				                return $ocLL.load(nowLoad);
				            });
				    }

				    function requiredData(name) {
				        if (jsRequires.modules)
				            for (var m in jsRequires.modules)
				                if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
				                    return jsRequires.modules[m];
				        return jsRequires.scripts && jsRequires.scripts[name];
				    }
				}]
	        };
	    }
	}
]);

angular.module('core').constant('JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //*** Javascript Plugins
        'modernizr': ['public/lib/components-modernizr/modernizr.js'],
        'moment': ['public/lib/moment/min/moment.min.js'],
        'spin': 'public/lib/spin.js/spin.js',

        //*** jQuery Plugins
        'perfect-scrollbar-plugin': ['public/lib/perfect-scrollbar/js/min/perfect-scrollbar.jquery.min.js', 'public/lib/perfect-scrollbar/css/perfect-scrollbar.min.css'],
        'ladda': ['public/lib/ladda/dist/ladda.min.js', 'public/lib/ladda/dist/ladda-themeless.min.css'],
        'sweet-alert': ['public/lib/sweetalert/lib/sweet-alert.min.js', 'public/lib/sweetalert/lib/sweet-alert.css'],
        'chartjs': 'public/lib/chartjs/Chart.min.js',
        'jquery-sparkline': 'public/lib/jquery.sparkline.build/dist/jquery.sparkline.min.js',
        'ckeditor-plugin': 'public/lib/ckeditor/ckeditor.js',
        'jquery-nestable-plugin': ['public/lib/jquery-nestable/jquery.nestable.js'],
        'touchspin-plugin': ['public/lib/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js', 'public/lib/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],

        //*** Controllers
        'dashboardCtrl': 'public/modules/core/controllers/dashboardCtrl.js',
        'iconsCtrl': 'public/modules/core/controllers/iconsCtrl.js',
        'vAccordionCtrl': 'public/modules/core/controllers/vAccordionCtrl.js',
        'ckeditorCtrl': 'public/modules/core/controllers/ckeditorCtrl.js',
        'laddaCtrl': 'public/modules/core/controllers/laddaCtrl.js',
        'ngTableCtrl': 'public/modules/core/controllers/ngTableCtrl.js',
        'cropCtrl': 'public/modules/core/controllers/cropCtrl.js',
        'asideCtrl': 'public/modules/core/controllers/asideCtrl.js',
        'toasterCtrl': 'public/modules/core/controllers/toasterCtrl.js',
        'sweetAlertCtrl': 'public/modules/core/controllers/sweetAlertCtrl.js',
        'mapsCtrl': 'public/modules/core/controllers/mapsCtrl.js',
        'chartsCtrl': 'public/modules/core/controllers/chartsCtrl.js',
        'calendarCtrl': 'public/modules/core/controllers/calendarCtrl.js',
        'nestableCtrl': 'public/modules/core/controllers/nestableCtrl.js',
        'validationCtrl': ['public/modules/core/controllers/validationCtrl.js'],
        'userCtrl': ['public/modules/core/controllers/userCtrl.js'],
        'selectCtrl': 'public/modules/core/controllers/selectCtrl.js',
        'wizardCtrl': 'public/modules/core/controllers/wizardCtrl.js',
        'uploadCtrl': 'public/modules/core/controllers/uploadCtrl.js',
        'treeCtrl': 'public/modules/core/controllers/treeCtrl.js',
        'inboxCtrl': 'public/modules/core/controllers/inboxCtrl.js',
        'xeditableCtrl': 'public/modules/core/controllers/xeditableCtrl.js',
        'chatCtrl': 'public/modules/core/controllers/chatCtrl.js',
        
        //*** Filters
        'htmlToPlaintext': 'assets/js/filters/htmlToPlaintext.js'
    },
    //*** angularJS Modules
    modules: [{
        name: 'angularMoment',
        files: ['public/lib/angular-moment/angular-moment.min.js']
    }, {
        name: 'toaster',
        files: ['public/lib/AngularJS-Toaster/toaster.js', 'public/lib/AngularJS-Toaster/toaster.css']
    }, {
        name: 'angularBootstrapNavTree',
        files: ['public/lib/angular-bootstrap-nav-tree/dist/abn_tree_directive.js', 'public/lib/angular-bootstrap-nav-tree/dist/abn_tree.css']
    }, {
        name: 'angular-ladda',
        files: ['public/lib/angular-ladda/dist/angular-ladda.min.js']
    }, {
        name: 'ngTable',
        files: ['public/lib/ng-table/dist/ng-table.min.js', 'public/lib/ng-table/dist/ng-table.min.css']
    }, {
        name: 'ui.select',
        files: ['public/lib/angular-ui-select/dist/select.min.js', 'public/lib/angular-ui-select/dist/select.min.css', 'public/lib/select2/dist/css/select2.min.css', 'public/lib/select2-bootstrap-css/select2-bootstrap.min.css', 'public/lib/selectize/dist/css/selectize.bootstrap3.css']
    }, {
        name: 'ui.mask',
        files: ['public/lib/angular-ui-utils/mask.min.js']
    }, {
        name: 'ngImgCrop',
        files: ['public/lib/ngImgCrop/compile/minified/ng-img-crop.js', 'public/lib/ngImgCrop/compile/minified/ng-img-crop.css']
    }, {
        name: 'angularFileUpload',
        files: ['public/lib/angular-file-upload/angular-file-upload.min.js']
    }, {
        name: 'ngAside',
        files: ['public/lib/angular-aside/dist/js/angular-aside.min.js', 'public/lib/angular-aside/dist/css/angular-aside.min.css']
    }, {
        name: 'truncate',
        files: ['public/lib/angular-truncate/src/truncate.js']
    }, {
        name: 'oitozero.ngSweetAlert',
        files: ['public/lib/angular-sweetalert-promised/SweetAlert.min.js']
    }, {
        name: 'monospaced.elastic',
        files: ['public/lib/angular-elastic/elastic.js']
    }, {
        name: 'ngMap',
        files: ['public/lib/ngmap/build/scripts/ng-map.min.js']
    }, {
        name: 'tc.chartjs',
        files: ['public/lib/tc-angular-chartjs/dist/tc-angular-chartjs.min.js']
    }, {
        name: 'flow',
        files: ['public/lib/ng-flow/dist/ng-flow-standalone.min.js']
    }, {
        name: 'uiSwitch',
        files: ['public/lib/angular-ui-switch/angular-ui-switch.min.js', 'public/lib/angular-ui-switch/angular-ui-switch.min.css']
    }, {
        name: 'ckeditor',
        files: ['public/lib/angular-ckeditor/angular-ckeditor.min.js']
    }, {
        name: 'mwl.calendar',
        files: ['public/lib/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar.js', 'public/lib/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js', 'public/lib/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css']
    }, {
        name: 'ng-nestable',
        files: ['public/lib/ng-nestable/src/angular-nestable.js']
    }, {
        name: 'vAccordion',
        files: ['public/lib/v-accordion/dist/v-accordion.min.js', 'public/lib/v-accordion/dist/v-accordion.min.css']
    }, {
        name: 'xeditable',
        files: ['public/lib/angular-xeditable/dist/js/xeditable.min.js', 'public/lib/angular-xeditable/dist/css/xeditable.css', 'assets/js/config/config-xeditable.js']
    }, {
        name: 'checklist-model',
        files: ['public/lib/checklist-model/checklist-model.js']
    }]
});

angular.module('core').constant('APP_MEDIAQUERY', {
    'desktopXL': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
});

