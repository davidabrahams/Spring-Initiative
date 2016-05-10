//controller to set inital variables for students, cohorts, and users
var indexController = function($scope, $http, $location, $state) {

  $scope.students = [];
  $scope.cohorts = [];

  $http.get('/user').then(function(data) {
    $scope.user = data.data.user;
    console.log("Current user: " + $scope.user.email);
  });

  $http.get('/api/overview').then(function(data) {
    $scope.overview = data.data.overviewData;
  }, function(err) {
    console.log('Error: in GET \'/overview\'', err);
  });

  $scope.logout = function(){
    // if you guys are curious you should look in the the official promise spec, which is different and in my opinion way cleaner than the q bullshit that angular uses
    $http.post("/api/logout").then(function successCallback(response) {
      $state.go('login');
    }, function errorCallback(response) {
      console.log("Error: " + data);
    });
  };

  $http.get('/api/allStudents').then(function(data) {
    $scope.students = data.data.allStudents;
  }, function(err) {
    console.log('Error: in GET \'/student\'', err);
  });

  $scope.showStudent = function(student){
    $scope.currentStudent = student;
    $scope.editStudent = angular.copy(student);
  };

  $scope.showCohort = function(cohortName){
    $scope.currentCohortName = cohortName;
    if ($scope.currentCohortName == 'Little Spring'){
      $scope.currentCohortInfo = 'Little Spring information here <3';
    }
    if ($scope.currentCohortName == 'Junior Spring'){
      $scope.currentCohortInfo = 'Junior Spring information here <3';
    }
    if ($scope.currentCohortName == 'Big Spring'){
      $scope.currentCohortInfo = 'Big Spring information here <3';
    }
    if ($scope.currentCohortName == 'Baby Spring'){
      $scope.currentCohortInfo = 'Baby Spring information here <3';
    }
  };

};
