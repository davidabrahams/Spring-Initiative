
var cohortController = function($scope,  $http, $state) {

  $scope.cohortName = $scope.$parent.currentCohortName;
  $scope.cohortInfo = $scope.$parent.currentCohortInfo;

  $scope.submitNewCohortEntry = function(cohortName) {

    $http.post('api/cohort/newCohortEntry/' + cohortName, $scope.newCohortEntry)
    .then(function successCallback(response) {
      $scope.cohortEntrySubmittedMsg = response.data.msg;
    }, function errorCallback(response) {
      $scope.cohortEntrySubmittedMsg = response.data.msg;
    });
  };
};
