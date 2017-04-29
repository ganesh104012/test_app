angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,LoginService) {
	
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
//});

})

.controller('LoginCtrl', function($scope,LoginService,$ionicPopup,$ionicModal,$state, $timeout,$ionicLoading,$stateParams) {
	// if($stateParams.isLogout)
	LoginService.ClearCredentials();
	// Form data for the login modal
	 $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
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
		$ionicLoading.show({
			template: 'Loading...',
			duration: 3000
		});
		LoginService.loginUser($scope.loginData.username, $scope.loginData.password)
		.success(function(data) {
			$ionicLoading.hide();
            $state.go('app.profile');
		})
		.error(function(data) {
			$ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
			});
			
		});
		console.log('Doing login', $scope.loginData);
		
		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		// $timeout(function() {
		// $scope.closeLogin();
		// }, 1000);
	};
})

.controller('UsersCtrl', function($scope,$ionicPlatform,$cordovaContacts,$ionicPopup) {
	$scope.max=10;
	$scope.notification={time:new Date()};
	$scope.users = [
		{ phone:'',about: '',title: 'Reggae', id: 1 },
		{ phone:'',about: '',title: 'Chill', id: 2 },
		{ phone:'',about: '',title: 'Dubstep', id: 3 }
	];
	$ionicPlatform.ready(function() {
		/* [{
			"id": "123",
			"rawId": "123",
			"displayName": "",
			"name": {
			"givenName": "",
			"formatted": ""
			},
			"nickname": null,
			"phoneNumbers": [
			{
			"id": "1711",
			"pref": false,
			"value": "972+54+7777777",
			"type": "mobile"
			}
			],
			"emails": [],
			"addresses": [],
			"ims": [],
			"organizations": null,
			"birthday": null,
			"note": "",
			"photos": null,
			"categories": null,
			"urls": null
		}] */
		if (window.cordova) {
			$scope.addContact = function() {
				/* $cordovaContacts.save($scope.contactForm).then(function(result) {
					// Contact saved
					}, function(err) {
					// Contact error
				}); */
			};
			
			$scope.findContactsBySearchTerm = function (searchTerm) {
				var opts = {                                           //search options
					filter : searchTerm,                                 // 'Bob'
					multiple: true,                                      // Yes, return any contact that matches criteria
					fields:  [ 'displayName', 'name' ],                   // These are the fields to search for 'bob'.
					desiredFields: ['id']    //return fields.
				};
				
				if ($ionicPlatform.isAndroid()) {
					opts.hasPhoneNumber = true;         //hasPhoneNumber only works for android.
				};
				
				$cordovaContacts.find(opts).then(function (contactsFound) {
					$scope.contacts = contactsFound;
				});
			};
			
			$scope.pickContactUsingNativeUI = function () {
				$cordovaContacts.pickContact().then(function (contactPicked) {
					$scope.contact = contactPicked;			
					$scope.users.push({phone:contactPicked.phoneNumbers[0].value,about:'',title:contactPicked.displayName,id:($scope.users.length+1)});
					$ionicPopup.alert({
						title: 'Success',
						template: 'New user created (' + contactPicked.displayName+') !'
					});
				},
				function(err){
					$ionicPopup.alert({
						title: 'Failed !',
						template: 'User Not Added (' + err+')'
					});
				});
			};
		}
	});
})

.controller('UserCtrl', function($scope, $stateParams) {
})
.controller('ProfileCtrl', function($scope, $stateParams) {
	// $scope.logged_email=$rootScope.globals.currentUser.username;
});
