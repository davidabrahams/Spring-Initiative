
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
  console.log('ADD COHORT ENTRY CONTROLLER')
  console.log('andCohortEntryController_CohortNameScope: ' + $scope.cohortName);
  console.log('andCohortEntryController_CohortName: ' + cohortName);
  $scope.submitNewCohortEntry = function(cohortName) {
    console.log('Controller submitting new cohort entry')
    $http.post('api/cohort/newCohortEntry/' + cohortName, $scope.newCohortEntry)
    .then(function successCallback(response) {
      $scope.cohortEntrySubmittedMsg = response.data.msg;
    }, function errorCallback(response) {
      console.log('Error: ' + response.data);
      $scope.cohortEntrySubmittedMsg = response.data.msg;

    });
  }
};
