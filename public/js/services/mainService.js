app.service('mainService', function($q, $http) {
	this.sendText = function(message) {
		var deferred = $q.defer();
		$http({
			url: 'http://localhost:8887/support/messages',
			method: "POST",
			data: {
				to: "",
				message: message
			}
		})
	};
})