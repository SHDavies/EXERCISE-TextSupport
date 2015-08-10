app.controller('supportController', function($scope, $firebaseArray, mainService) {
	var ref = new Firebase('https://text-support-devmtn.firebaseio.com/numbers');

	$scope.calls = $firebaseArray(ref);

	$scope.sendText = function() {
		mainService.sendText($scope.newText);
	}
})