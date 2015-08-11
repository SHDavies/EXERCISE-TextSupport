app.service('mainService', function($q, $http) {
	this.sendText = function(message) {
		var deferred = $q.defer();
		$http({
			url: 'http://localhost:8887/support/messages',
			method: "POST",
			data: {
				to: "8014714889",
				message: message
			}
		})
	};

	this.getTerms = function() {
		$http.get('http://localhost:8887/support/resources/terms-and-conditions')
	}
})