'use strict';

module.exports = {
	app: {
		title: 'meantest',
		description: 'mean test',
		keywords: 'mean test'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/font-awesome/css/font-awesome.min.css',
				'public/lib/ng-table/dist/ng-table.min.css',
				'public/lib/themify-icons/themify-icons.css',
				'public/lib/angular-ui-switch/angular-ui-switch.min.css',
				'public/lib/angular-ui-select/dist/select.min.css',
				'public/lib/angular-loading-bar/build/loading-bar.min.css',
				'public/lib/animate.css/animate.min.css'
			],
			js: [
			    'public/lib/jquery/dist/jquery.min.js',
				'public/lib/angular/angular.min.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/fastclick/lib/fastclick.js',		
				'public/lib/angular-cookies/angular-cookies.min.js',
				'public/lib/angular-animate/angular-animate.min.js',	
				'public/lib/angular-touch/angular-touch.min.js',
				'public/lib/angular-sanitize/angular-sanitize.min.js',
				'public/lib/angular-ui-router/release/angular-ui-router.min.js',
				'public/lib/angular-ui-select/dist/select.min.js',
				'public/lib/ng-table/dist/ng-table.min.js',
				'public/lib/angular-ui-switch/angular-ui-switch.min.js',
				'public/lib/ngstorage/ngStorage.min.js',
				'public/lib/angular-translate/angular-translate.min.js',
				'public/lib/angular-translate-loader-url/angular-translate-loader-url.min.js',
				'public/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
				'public/lib/angular-translate-storage-local/angular-translate-storage-local.min.js',
				'public/lib/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
				'public/lib/oclazyload/dist/ocLazyLoad.min.js',
				'public/lib/angular-breadcrumb/dist/angular-breadcrumb.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
				'public/lib/angular-loading-bar/build/loading-bar.min.js',
				'public/lib/angular-scroll/angular-scroll.min.js',
				'public/lib/perfect-scrollbar/js/min/perfect-scrollbar.jquery.min.js'
				
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};