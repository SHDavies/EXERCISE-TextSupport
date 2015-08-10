var app = angular.module('textApp', ['ngRoute', 'firebase'])

app.config(['$routeProvider',function(router) {
	router
		.when('/', {
			templateUrl: './views/home.html'
		})
		.when('/support', {
			templateUrl: './views/support.html',
			controller: 'supportController'
		})
		.otherwise({
			redirectTo: '/'
		})
}]);