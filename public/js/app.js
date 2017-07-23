var app = angular.module('app', ["ngRoute"]);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "../../client/partials/main.html",   
    controller: "mainController" 
  })
  .when("/signout", {
    templateUrl : "../../client/partials/main.html",    
  })
  .when("/signin", {
    templateUrl : "../../client/partials/signin.html",    
    controller: "signInController"   
  })
  .when("/signup", {
    templateUrl : "../../client/partials/signup.html", 
    controller: "signUpController"   
  })
  .when("/main", {
    templateUrl : "../../client/partials/main.html",    
    controller: "mainController" 
  });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

app.controller('nav', function($scope, $window, $location) {
  $scope.signOut = function() {
    $window.localStorage.username = '';    
  }
});

app.controller("mainController", function($scope, $window, $http, $location, passHash, dataRequest) {
  if($window.localStorage.username !== '') {
    $('#callout').text('Hello ' + $window.localStorage.username);
  }
  $http({
    method: 'POST',
    url: '/users/getUser',
    data: {username: $window.localStorage.username}
  }).then(function successCallback(response) {    
    $scope.destinations = response.data.userData;
  }, function errorCallback(response) {      
    console.log('get user fails', response.data);      
  });


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
    if($window.localStorage.username !== '') {
      $('.new-destinatary-overlay').css('display', 'none');  
      var newDestinatary = $scope.newDestinatary;
      $scope.destinations.push(newDestinatary);  
      $http({
        method: 'POST',
        url: '/users/update',
        data: {username: $window.localStorage.username, newDestination: $scope.newDestinatary}
      })  
    } else {
      $('.new-destinatary-overlay').css('display', 'none');  
    }
  }
});

app.controller("signUpController", function($scope, $http, $location, $window) {  
  $scope.createUser = function(username, password) {
    $http({
      method: 'POST',
      url: '/users',
      data: {username: username, password: password}
    }).then(function successCallback(response) {
      console.log('success', response.data);
      $window.localStorage.username = response.data.username;
      $location.path(response.data.redirect)
    }, function errorCallback(response) {      
      console.log('fail', response);      
    });
  }
})

app.controller("signInController", function($scope, $http, $location, $window) {  
  $scope.authenticate = function(username, password) {
    console.log('trying to signin')
    $http({
      method: 'POST',
      url: '/signin',
      data: {username: username, password: password}
    }).then(function successCallback(response) {
      $window.localStorage.username = response.data.username;
      $location.path(response.data.redirect)      
    }, function errorCallback(response) {      
      console.log('fail signin')
    });
  }
})