//contoller to deal with settings page- including admin changes, main page message, and changing passwords
var settingsController = function($scope, $http, $location) {

  $http.get('api/allUsers').then(function successCallback(response) {
    $scope.allUsers = response.data;
  }, function errorCallback(response) {
    console.log('Error: ' + response.data);
  });

  $scope.toggleAdmin = function(username) {
    $http.post('api/changeAdmin/'+username._id).then(function successCallback(response) {
      username.isAdmin = !username.isAdmin;
    }, function errorCallback(response) {
      console.log('Error: ' + response.data);
    });
  };

  $scope.delUser = function(username, userArray, delUserIdx) {
    $http.delete('api/delUser/'+username._id).then(function successCallback(response) {
      userArray.splice(delUserIdx, 1);
    }, function errorCallback(response) {
      console.log('Error: ' + response.data);
    });
  };

  $scope.changePassword = function(user) {
    if($scope.currentPassword1 === $scope.currentPassword2 && $scope.currentPassword1 != undefined){
      $http.post('api/changePassword/'+user._id,{
        password: $scope.currentPassword1
      }).then(function successCallback(response) {
        $scope.form_change_password.$setPristine();
        $scope.currentPassword1 = null;
        $scope.currentPassword2 = null;
        $scope.passwordMatchError = null;
        $scope.passwordChangeMsg = response.data.msg;
        // this clears focus from the form!
        $('#chngPassword2').focus();
        $('#chngPassword2').blur();
    }, function errorCallback(response) {
        $scope.passwordMatchError = null;
        $scope.passwordChangeMsg = response.data.msg;
    });
    } else {
      $scope.passwordMatchError = "Passwords do not match";
      $scope.passwordChangeMsg = null;
    }
  };
};
