
var cohortController = function($scope,  $http, $state) {

  $scope.cohortName = $scope.$parent.currentCohortName;
};

var cohortStudentsController = function($scope, $http, $state) {

  $scope.showStudent = function(student) {
    $scope.$parent.$parent.currentStudent = student;
    $scope.$parent.$parent.editStudent = angular.copy(student);
    $state.go('index.student.showData');
  };
};
