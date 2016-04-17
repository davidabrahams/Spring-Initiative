var studentController = function($scope,  $http, $state) {

  $scope.$state = $state;
  //TODO: check these and make sure they work
  $scope.submitEditStudent = function(editStudent, currentStudent) {
    $http.post('api/student/edit/' + currentStudent._id, editStudent)
    .then(function successCallback(response) {
      $scope.$parent.students = response.data.allStudents;
      $scope.$parent.currentStudent = response.data.currentStudent;
      $scope.studentEditMsg = response.data.msg;
      // Need to clear the form after submission
      $('.submit').focus();
      $('.submit').blur();      
    }, function errorCallback(response) {
        console.log('Error: ' + response.data);
        $scope.studentEditMsg = response.data.msg;
    });
  }

  $scope.getArchive = function() {
    $http.get('api/index/archive').then(function successCallback(response) {
      $scope.allArchivedStudents = response.data;
    }, function errorCallback(response) {
      console.log('Error:' + response.data);
    });
  }

};

var addEntryController = function($scope, $http, $location) {
  $scope.newEntry = {engageContent: 5, engagePeer: 5};
  $scope.submitNewEntry = function(student) {
    $http.post('api/student/newEntry/' + student._id, $scope.newEntry)
    .then(function successCallback(response) {
      $scope.entrySubmittedMsg = response.data.msg;
      $scope.newEntry = {engageContent: 5, engagePeer: 5};
    }, function errorCallback(response) {
      console.log('Error: ' + response.data);
      $scope.entrySubmittedMsg = response.data.msg;
    });
  }

  $scope.submitLongEntry = function(student) {
    $http.post('api/student/newLongEntry/' + student._id, $scope.newLongEntry)
    .then(function successCallback(response) {
      $scope.newLongEntry = null;
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
      $scope.newStudent = null;
      $scope.studentAddedMsg = response.data.msg;
      $('#archiveRadio').focus();
      $('#archiveRadio').blur();
    }, function errorCallback(response) {
      console.log('Error: ' + response.data);
      $scope.studentAddedMsg = response.data.msg;
    });

  };
};
