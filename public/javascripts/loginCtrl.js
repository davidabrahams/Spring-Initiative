loginApp.controller('loginCtrl', function($scope, $http) {
  $scope.login = function() {
    console.log($scope.username);
    $http.post("login", {username: $scope.username, password: $scope.password}).then(function (response) {}, function (response) {});
  }


  $scope.register = function() {
    console.log($scope.username);
    var data = {username: $scope.username, password: $scope.password};
    console.log(data)
    $http.post("register", data).then(function (response) {
      console.log('success!');
      console.log(response);
    }, function (response) {
      console.log('error!');
      console.log(response);
    });
  }
});
