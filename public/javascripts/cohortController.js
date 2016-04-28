
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

var cohortStudentsController = function($scope, $http, $state) {

  $scope.showStudent = function(student) {
    $scope.$parent.$parent.currentStudent = student;
    $scope.$parent.$parent.editStudent = angular.copy(student);
    $state.go('index.student.showData');
  };
};
