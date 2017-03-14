var app = angular.module('app', ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "../../client/partials/main.html",   
    controller: "mainController" 
  })
  .when("/plan", {
    templateUrl : "../../client/partials/plan.html",    
  })
  .when("/signin", {
    templateUrl : "../../client/partials/signin.html",    
  })
  .when("/signup", {
    templateUrl : "../../client/partials/signup.html", 
    controller: "signUpController"   
  })
  .when("/main", {
    templateUrl : "../../client/partials/main.html",    
    controller: "mainController" 
  })
});

app.controller("mainController", function($scope, $location, passHash) {
  $scope.destinations = ["facebook", "scotiabank", "twitter"];
	$scope.getCristalPass = function() {
		var secretWord = $scope.secretInput;
    var destination = $scope.destination;
		$scope.cristalpass = passHash.cristalHash(secretWord, destination);
    $('.overlay').css('display', 'none');
	}

  $scope.passOverlay = function(destination) {
    $('.overlay').css('display', 'block');
    $scope.destination = destination;
  }

  $scope.newDestinataryOverlay = function() {
    $('.new-destinatary-overlay').css('display', 'block');  
  }

  $scope.createNewDestinatary = function() {
    $('.new-destinatary-overlay').css('display', 'none');  
    var newDestinatary = $scope.newDestinatary;
    $scope.destinations.push(newDestinatary);  
  }
});

app.controller("signUpController", function($scope, $http) {  
  $scope.createUser = function(username, password) {
    $http({
      method: 'POST',
      url: '/users',
      data: {username: username, password: password, destinations: []}
    })
  }
})