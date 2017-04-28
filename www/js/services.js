angular.module('starter.services', [])

.service('LoginService', function($q,$cookieStore,$rootScope,$timeout) {
	return {
		loginUser: function(usr,pwd){
			var deferred=$q.defer();
			var promise=deferred.promise;
			if(usr!=""&&pwd!="")
			{
				this.SetCredentials(usr,pwd);
				$timeout(function(){
					deferred.resolve('Welcome '+usr+'!');
				},2000);
			}
			else
			{
				deferred.reject('Wrong Credentials!');
			}
			promise.success = function(fn) {
                promise.then(fn);
                return promise;
			}
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
			}
			return promise;
		},
		SetCredentials : function (username, password) {
            // var authdata = Base64.encode(username + ':' + password);
			
            $rootScope.globals = {
                currentUser: {
                    username: username
				}
			};
			
            // $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
		},
		
        ClearCredentials : function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            // $http.defaults.headers.common.Authorization = 'Basic ';
		},
		isLogin: function(){
			var globals=$cookieStore.get('globals');
			if(globals&&globals.currentUser)
			{
				$rootScope.globals=globals;
				return true;
			}
			else
			return false;
		}
	}
});
