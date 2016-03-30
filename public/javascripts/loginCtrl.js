app.controller('loginController', function($scope, $http) {
  console.log('test');
  $scope.login = function() {
    console.log($scope.email);
    $http.post('login', {username: $scope.email, password: $scope.password}).then(function (response) {
      console.log(response.data);
      window.location.href = response.data.redirect;
    }, function (response) {
      console.log(response.data);
    });
  }

  $scope.register = function() {
    var data = {username: $scope.email, password: $scope.password};
    $http.post('register', data).then(function (response) {
      window.location.href = response.data.redirect;zx
    }, function (response) {
      console.log('error: %s', response.data);
    });
  }
});