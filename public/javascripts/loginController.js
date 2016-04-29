var loginController = function($scope, $http, $state) {

  $scope.emailGroupClass = {'form-group': true};
  $scope.passwordGroupClass = {'form-group': true};

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
        $scope.emailGroupClass['has-error'] = true;
        $scope.passwordGroupClass['has-error'] = false;
        $scope.email_error = response.data;
        $scope.password_error = null;
        $scope.verification_alert = false;
      } else if (msg == 'Incorrect password') {
        $scope.passwordGroupClass['has-error'] = true;
        $scope.emailGroupClass['has-error'] = false;
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
      $scope.verification_alert = true;
    }, function(response) {
      console.log('error: %s', response.data);
    });
  };
};
