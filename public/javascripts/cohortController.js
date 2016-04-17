
var cohortController = function($scope, $http, $location) {

  $http.get('api/allCohorts').then(function successCallback(response) {
    $scope.allCohorts = response.data;
  }, function errorCallback(response) {
    console.log('Error: ' + response.data);
  });

  $scope.cohortName = $scope.$parent.currentCohortName;
   //get all cohort data
  $scope.cohortInfo = ':3';
};
