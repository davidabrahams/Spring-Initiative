
var cohortStudentsController = function($scope, $http, $state) {

  $scope.showStudent = function(student){
    console.log('current stud',$scope.currentStudent);
    console.log('curr parent stud',$scope.$parent.currentStudent);
    $scope.$parent.currentStudent = student;
    console.log('curr parent stud',$scope.$parent.currentStudent);
    $scope.$parent.editStudent = angular.copy(student);
  };
};
