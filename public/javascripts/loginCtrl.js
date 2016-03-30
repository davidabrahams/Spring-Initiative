loginApp.controller('loginCtrl', function($scope, $http) {
  $scope.login = function() {
    console.log($scope.email);
    $http.post("login", {username: $scope.email, password: $scope.password}).then(function (response) {
      console.log(response.data);
      window.location.href = response.data.redirect;
    }, function (response) {
      var msg = response.data;
      if (msg === 'Incorrect username' || msg === 'User did not verify email!') {
        $('#email-group').addClass('has-error');
        $('#password-group').removeClass('has-error');
        $scope.email_error = response.data;
        $scope.password_error = null;
      } else if (msg == 'Incorrect password') {
        $('#password-group').addClass('has-error');
        $('#email-group').removeClass('has-error');
        $scope.password_error = response.data;
        $scope.email_error = null;
      } else {
        console.log(msg);
      }
    });
  }


  $scope.register = function() {
    var data = {username: $scope.email, password: $scope.password};
    $http.post("register", data).then(function (response) {
      console.log('success!');
      console.log(response.data);
      // window.location.href = response.data.redirect;
    }, function (response) {
      console.log('error: %s', response.data);
    });
  }
});
