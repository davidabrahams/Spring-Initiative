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
  }

 $http.get('/api/allCohorts').then(function(data) {
    console.log ('Data: ' + data);
    console.log ('All Cohorts Data: ' + data.allCohorts);
    $scope.currentCohort= data.currentCohort;
    $scope.cohorts = data.allCohorts;

    console.log('Scope Cohorts' + $scope.cohorts)
  }, function(err) {
    console.log('Error: in GET \'/cohort\'', err);
  });

  $scope.showCohort = function(cohortName){
    $scope.currentCohortName = cohortName;
  }

};

var cohortController = function($scope,  $http, $state) {
  $scope.cohortName = $scope.$parent.currentCohortName;
   //get all cohort data
  $scope.cohortInfo = 'List information here <3';
  $scope.cohortActionSteps = 'ActionStepsHere';
};