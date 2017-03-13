var app = angular.module('app', ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
  .when("/plan", {
    templateUrl : "plan.html"
  })
});

app.controller("mainController", function($scope, passHash) {
	$scope.getCristalPass = function() {
		var secretWord = $scope.secretInput;
		var destination = $scope.destination;
		$scope.cristalpass = passHash.cristalHash(secretWord, destination);
	}
})