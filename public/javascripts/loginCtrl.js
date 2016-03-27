loginApp.controller('loginCtrl', function($scope, $http) {
  $scope.login = function() {
    console.log($scope.email);
    $http.post("login", {username: $scope.email, password: $scope.password}).then(function (response) {
      console.log(response.data);
      window.location.href = response.data.redirect;
    }, function (response) {
      console.log(response.data);
    });
  }


  $scope.register = function() {
    console.log($scope.email);
    var data = {username: $scope.email, password: $scope.password};
    console.log(data)
    $http.post("register", data).then(function (response) {
      console.log('success!');
      console.log(response.data);
      window.location.href = response.data.redirect;
    }, function (response) {
      console.log('error!');
      console.log(response.data);
    });
  }
});
