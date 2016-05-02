var settingsController = function($scope, $http, $location) {
  $scope.newOverview = angular.extend($scope.overview.overview);

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

  $scope.changeOverview = function(){
    console.log('normal',$scope.newOverview);
    console.log('childhead',$scope.$$childHead.newOverview);
    // Yes, $$childHead is necessary to access the updated overview. Why, I do not know
    $http.post('api/editOverview/?_id=' + $scope.overview._id, {
      newData: $scope.$$childHead.newOverview
     }).then(function successCallback(response) {
      console.log(response);
      $scope.overviewChangeMsg = "Overview information updated.";
      $scope.overview = response.data.overview;
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
