var indexController = function($scope, $http, $location, $state) {

  $scope.students = [];
  $scope.cohorts = [];

  $http.get('/user').then(function(data) {
    $scope.user = data.data.user
    console.log("Current user: " + $scope.user.email);

  })

  $scope.logout = function(){
    $http.post("/api/logout").then(function successCallback(response) {
      $state.go('login');
    }, function errorCallback(response) {
      console.log("Error: " + data);
    });
  }

  $http.get('/api/allStudents').then(function(data) {
    $scope.students = data.data;
  }, function(err) {
    console.log('Error: in GET \'/student\'', err);
  });

  $scope.showStudent = function(student){
    $scope.currentStudent = student;
    $scope.editStudent = angular.copy(student);
    $scope.updateLocalEntries();
  }

  $scope.showCohort = function(cohortName){
    $scope.currentCohortName = cohortName;
    if ($scope.currentCohortName == 'Little Spring'){
      $scope.currentCohortInfo = 'Little Spring information here <3';
    };
    if ($scope.currentCohortName == 'Junior Spring'){
      $scope.currentCohortInfo = 'Junior Spring information here <3';
    };
    if ($scope.currentCohortName == 'Big Spring'){
      $scope.currentCohortInfo = 'Big Spring information here <3';
    };
    if ($scope.currentCohortName == 'Baby Spring'){
      $scope.currentCohortInfo = 'Baby Spring information here <3';
    };
  }

  $scope.updateLocalEntries = function() {

    $scope.allEntries = null;

    // get all entries for the current student to make sure we dont make an entry
    // for a date that already has one
    var req = {studentID: $scope.currentStudent._id};
    $http.get('/api/student/allEntries', {params: req})
    .then(function successCallback(response) {
      $scope.allEntries = response.data;
    }, function errorCallback(response) {
        console.log('Error: ' + response.data);
    });
  }

};
