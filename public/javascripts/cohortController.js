
var cohortController = function($scope,  $http, $state) {
  $scope.cohortName = $scope.$parent.currentCohortName;
  $scope.cohortInfo = $scope.$parent.currentCohortInfo;
  console.log('cohort name: ' + $scope.cohortName);
 


//var addCohortEntryController = function($scope, $http, $location) {
  console.log('ADD COHORT ENTRY CONTROLLER')
  console.log('andCohortEntryController_CohortNameScope: ' + $scope.cohortName);
  //console.log('andCohortEntryController_CohortName: ' + cohortName);


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
//};
