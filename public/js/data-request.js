app.factory('dataRequest', function($http){
  return {
    getUser: function() {
      return $http.get('users/getUser', { 
        params: { user_id: "hola" } 
      })
    }
  }
});