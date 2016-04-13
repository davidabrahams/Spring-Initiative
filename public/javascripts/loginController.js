var loginController = function($scope, $http, $state) {
  $scope.login = function() {
    $http.post('api/login', {
      username: $scope.email,
      password: $scope.password
    }).then(function(response) {
      $state.go('index');
    }, function(response) {
      var msg = response.data;
      if (msg === 'Incorrect username' || msg ===
        'User did not verify email!') {
        $('#email-group').addClass('has-error');
        $('#password-group').removeClass('has-error');
        $scope.email_error = response.data;
        $scope.password_error = null;
        $scope.verification_alert = false;
      } else if (msg == 'Incorrect password') {
        $('#password-group').addClass('has-error');
        $('#email-group').removeClass('has-error');
        $scope.password_error = response.data;
        $scope.email_error = null;
        $scope.verification_alert = false;
      } else {
        console.log('Error: ', msg);
      }
    });
  };

  $scope.register = function() {
    var data = {
      username: $scope.email,
      password: $scope.password
    };
    $http.post('api/register', data).then(function(response) {
      $scope.registerEmail = angular.copy($scope.email);
      $scope.verification_alert = true;
    }, function(response) {
      console.log('error: %s', response.data);
    });
  };
}
