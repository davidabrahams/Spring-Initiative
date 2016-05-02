var indexController = function($scope, $http, $location, $state) {

  $scope.students = [];
  $scope.cohorts = [];

  $http.get('/user').then(function(data) {
    $scope.user = data.data.user;
    console.log("Current user: " + $scope.user.email);

  });

  $scope.logout = function(){
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
    $state.go("index.cohort.addEntry",  {}, {reload: "index.cohort.addEntry"});
  };

};
