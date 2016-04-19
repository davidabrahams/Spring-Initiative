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

var addDailyEntryController = function($scope, $http, $location) {
  $('.datepicker').datepicker({
    format: 'mm/dd/yyyy',
    autoclose: true,
    todayHighlight: true
  });
  $scope.newDailyEntry = {engageContent: 5, engagePeer: 5};
  $scope.submitNewDailyEntry = function(student) {
    $http.post('api/student/newDailyEntry/' + student._id, $scope.newDailyEntry)
    .then(function successCallback(response) {
      $scope.entrySubmittedMsg = response.data.msg;
      $scope.newDailyEntry = {engageContent: 5, engagePeer: 5};
    }, function errorCallback(response) {
      console.log('Error: ' + response.data);
      $scope.entrySubmittedMsg = response.data.msg;
    });
  };

  var req = {studentID: $scope.currentStudent._id};
  console.log(req)
  $http.get('/api/student/allEntries', {params: req})
  .then(function successCallback(response) {
    $scope.allEntries = response.data;
    console.log(response);
  }, function errorCallback(response) {
      console.log('Error: ' + response.data);
  });

  $scope.dateChange = function() {
    var dateMatch = -1;
    console.log($scope.allEntries)
    $scope.allEntries.forEach(function (entry, i) {
      var date = entry.date;
      var year1 = date.substring(0, 4);
      var month1 = date.substring(5, 7);
      var day1 = date.substring(8, 10);
      var year2 = $scope.newDailyEntry.date.substring(6, 10)
      var month2 = $scope.newDailyEntry.date.substring(0, 2)
      var day2 = $scope.newDailyEntry.date.substring(3, 5)
      if (year1 == year2 && month1 == month2 && day1 == day2) {
        dateMatch = i;
      }
    });
    if (dateMatch !== -1)
    {
      var prepopulate = window.confirm("A entry for this date already exists. Would you like to edit your existing entry?");
      if (prepopulate)
      {
        var currentDate = $scope.allEntries[dateMatch];
        $scope.newDailyEntry.attendance = currentDate.attendance;
        $scope.newDailyEntry.behaviorText = currentDate.behaviorText;
        $scope.newDailyEntry.warnings = currentDate.warnings;
        $scope.newDailyEntry.stars = currentDate.stars;
        if ($scope.newDailyEntry.schoolBehavior == null) {
          $scope.newDailyEntry.schoolBehavior = {}
        }
        $scope.newDailyEntry.schoolBehavior['Write-Up'] = currentDate.schoolBehavior['Write-Up'];
        $scope.newDailyEntry.schoolBehavior['Detention'] = currentDate.schoolBehavior['Detention'];
        $scope.newDailyEntry.schoolBehavior['In-School Suspension'] = currentDate.schoolBehavior['In-School Suspension'];
        $scope.newDailyEntry.schoolBehavior['Out-of-School Suspension'] = currentDate.schoolBehavior['Out-of-School Suspension'];
        $scope.newDailyEntry.actionSteps = currentDate.actionSteps;
        $scope.newDailyEntry.teacherFeedback = currentDate.teacherFeedback;
        $scope.newDailyEntry.engageContent = currentDate.engageContent;
        $scope.newDailyEntry.engagePeer = currentDate.engagePeer;
      }
      else {
        $scope.newDailyEntry.date = null;
      }
    }
    console.log($scope.newDailyEntry.date)
  }
}

var addLongEntryController = function($scope, $http, $location) {
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
