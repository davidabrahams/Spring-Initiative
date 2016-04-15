$scope.cohorts = [];

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