var studentController = function($scope,  $http, $state) {

  $scope.$state = $state;
  //TODO: check these and make sure they work
  $scope.submitEditStudent = function(editStudent, currentStudent) {
    $http.post('api/student/edit/' + currentStudent._id, editStudent)
    .then(function successCallback(response) {
      $scope.$parent.students = response.data.allStudents;
      $scope.$parent.currentStudent = response.data.currentStudent;
      $scope.studentEditMsg = response.data.msg;
    }, function errorCallback(response) {
        console.log('Error: ' + response.data);
        $scope.studentEditMsg = response.data.msg;
    });
  }

  // TODO: .success and .error are deprecated
  $scope.getArchive = function() {
    $http.get('api/index/archive').then(function successCallback(response) {
      $scope.allArchivedStudents = response.data;
    }, function errorCallback(response) {
      console.log('Error:' + response.data);
    });
  }

};

var addEntryController = function($scope, $http, $location) {
  $scope.submitNewEntry = function(student) {
    $http.post('api/student/newEntry/' + student._id, $scope.newEntry)
    .then(function successCallback(response) {
      $scope.entrySubmittedMsg = response.data.msg;
    }, function errorCallback(response) {
      console.log('Error: ' + response.data);
      $scope.entrySubmittedMsg = response.data.msg;

    });
  }
};

var addStudentController = function($scope, $http, $location) {
  $scope.addStudent = function() {
    $http.post('api/student/add', $scope.newStudent).then(function successCallback(
      response) {
      $scope.$parent.students = response.data.allStudents;
      $scope.newStudent = response.data.newStudent;
      $scope.studentAddedMsg = response.data.msg;
    }, function errorCallback(response) {
      console.log('Error: ' + response.data);
      $scope.studentAddedMsg = response.data.msg;
    });

  };
};
