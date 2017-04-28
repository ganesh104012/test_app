// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services','starter.directives','ngCookies'])

.run(function($ionicPlatform,$rootScope, $location,LoginService) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
			
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
		
        $rootScope.$on('$ionicView.enter', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !LoginService.isLogin()) {
                $location.path('/login');
            }
        });
	});
})

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	
	.state('login', {
		url: '/login',
		templateUrl: 'templates/login_page.html',
		controller: 'LoginCtrl'
	})
    .state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html',
		controller: 'AppCtrl',
		/* resolve:{
			 "check":function(LoginService,$location){
				if(!LoginService.isLogin()){
					alert("You don't have access here");
					$location.path('/login');
				}
			} 
		} */
	})
	
	.state('app.profile', {
		url: '/profile',
		views: {
			'menuContent': {
				templateUrl: 'templates/profile.html',
				controller:'ProfileCtrl'
			}
			}
		})
		
		.state('app.users', {
			url: '/users',
			views: {
				'menuContent': {
					templateUrl: 'templates/users.html',
					controller: 'UsersCtrl'
				}
			}
		})
		
		.state('app.single', {
			url: '/users/:userId',
			views: {
				'menuContent': {
					templateUrl: 'templates/user.html',
					controller: 'UserCtrl'
				}
			}
		});
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/login');
	});
