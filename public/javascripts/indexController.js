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


  $scope.showCohort = function(cohortName){
    $scope.currentCohortName = cohortName;
  }

};

var cohortController = function($scope,  $http, $state) {
  $scope.cohortName = $scope.$parent.currentCohortName;
  console.log('cohort name: ' + $scope.cohortName);
   //get all cohort data
  if ($scope.cohortName == 'Little Spring'){
    $scope.cohortInfo = 'Little Spring information here <3';
  };
  if ($scope.cohortName == 'Junior Spring'){
    $scope.cohortInfo = 'Junior Spring information here <3';
  };
  if ($scope.cohortName == 'Big Spring'){
    $scope.cohortInfo = 'Big Spring information here <3';
  };
  if ($scope.cohortName == 'Baby Spring'){
    $scope.cohortInfo = 'Baby Spring information here <3';
  };

  $scope.cohortActionSteps = 'ActionStepsHere';
};

var addCohortEntryController = function($scope, $http, $location) {

  $scope.submitNewCohortEntry = function(cohortName) {
    console.log('Controller submitting new cohort entry')
    $http.post('api/cohort/newEntry/' + cohortName, $scope.newCohortEntry)
    .then(function successCallback(response) {
      $scope.cohortEntrySubmittedMsg = response.data.msg;
    }, function errorCallback(response) {
      console.log('Error: ' + response.data);
      $scope.cohortEntrySubmittedMsg = response.data.msg;

    });
  }
};
