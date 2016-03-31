app.controller('loginController', function($scope, $http, $location, $rootScope) {
  $scope.login = function() {
    console.log($scope.email);
    $http.post('login', {username: $scope.email, password: $scope.password})
      .then(function (response) {
        console.log(response.data);
        //if correct
        $rootScope.loggedInUser = $scope.email;
        console.log($rootScope.loggedInUser + ' logged in.');
        $location.path(response.data.redirect);

      }, function (response) { //change to .success().error()?
        console.log(response.data);
    });
  }

  $scope.register = function() {
    var data = {username: $scope.email, password: $scope.password};
    $http.post('register', data).then(function (response) {
      $location.path(response.data.redirect);
    }, function (response) {
      console.log('error: %s', response.data);
    });
  }
});