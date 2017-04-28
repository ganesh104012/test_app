angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,LoginService) {
	
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
//});

})

.controller('LoginCtrl', function($scope,LoginService,$ionicPopup,$ionicModal,$state, $timeout) {
	LoginService.ClearCredentials();
	// Form data for the login modal
	$scope.loginData = {};
	
	// Create the login modal that we will use later
	// $ionicModal.fromTemplateUrl('templates/login.html', {
		// scope: $scope
		// }).then(function(modal) {
		// $scope.modal = modal;
	// });
	
	// Triggered in the login modal to close it
	// $scope.closeLogin = function() {
		// $scope.modal.hide();
	// };
	
	// Open the login modal
	// $scope.login = function() {
		// $scope.modal.show();
	// };
	
	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		$scope.dataLoading=true;
		LoginService.loginUser($scope.loginData.username, $scope.loginData.password)
		.success(function(data) {
			$scope.dataLoading=false;
            $state.go('app.profile');
		})
		.error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
			});
			$scope.dataLoading=false;
			
		});
			console.log('Doing login', $scope.loginData);
		
		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		// $timeout(function() {
			// $scope.closeLogin();
		// }, 1000);
	};
})

.controller('UsersCtrl', function($scope) {
	$scope.max=10;
	$scope.notification={time:new Date()};
	$scope.users = [
		{ about: '',title: 'Reggae', id: 1 },
		{ about: '',title: 'Chill', id: 2 },
		{ about: '',title: 'Dubstep', id: 3 },
		{ about: '',title: 'Indie', id: 4 },
		{ about: '',title: 'Rap', id: 5 },
		{ about: '',title: 'Cowbell', id: 6 }
	];
	})
	
	.controller('UserCtrl', function($scope, $stateParams) {
	})
	.controller('ProfileCtrl', function($scope, $stateParams) {
		// $scope.logged_email=$rootScope.globals.currentUser.username;
	});
		