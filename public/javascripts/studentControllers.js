var studentController = function($scope, $http, $state) {

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
}

var addDailyEntryController = function($scope, $http, $location) {

  // Ititialize the datepicker with settings
  $('.datepicker').datepicker({
    format: 'mm/dd/yyyy',
    autoclose: true,
    todayHighlight: true
  });

   $scope.slider = {
      value: 3,
      options: {
          showSelectionBar: true,
          getPointerColor: function(value) {
              return '#308a83';
          },
          getSelectionBarColor: function(value) {
            return '#eee';
          }
      }
  }

  // get all entries for the current student to make sure we dont make an entry
  // for a date that already has one
  var req = {studentID: $scope.currentStudent._id};
  $http.get('/api/student/allEntries', {params: req})
  .then(function successCallback(response) {
    $scope.allEntries = response.data;
  }, function errorCallback(response) {
      console.log('Error: ' + response.data);
  });

  $scope.newDailyEntry = {engageContent: 5, engagePeer: 5, engageAdult: 5};
  $scope.dateMatch = -1;

  $scope.submitNewDailyEntry = function(student) {
    $http.post('api/student/newDailyEntry/' + student._id, $scope.newDailyEntry)
    .then(function successCallback(response) {
      $scope.entrySubmittedMsg = response.data.msg;
      $scope.newDailyEntry = {engageContent: 5, engagePeer: 5, engageAdult: 5};
      // update the document locally too
      if ($scope.dateMatch !== -1) {
        $scope.allEntries[$scope.dateMatch] = response.data.newEntryObj;
      }
    }, function errorCallback(response) {
      console.log('Error: ' + response.data);
      $scope.entrySubmittedMsg = response.data.msg;
    });
  }

  $scope.dateChange = function() {
    $scope.dateMatch = -1;
    $scope.allEntries.forEach(function (entry, i) {
      var date = entry.date;
      var year1 = date.substring(0, 4);
      var month1 = date.substring(5, 7);
      var day1 = date.substring(8, 10);
      var year2 = $scope.newDailyEntry.date.substring(6, 10)
      var month2 = $scope.newDailyEntry.date.substring(0, 2)
      var day2 = $scope.newDailyEntry.date.substring(3, 5)
      if (year1 == year2 && month1 == month2 && day1 == day2) {
        $scope.dateMatch = i;
      }
    });
    if ($scope.dateMatch !== -1) {
      var prepopulate = window.confirm("A entry for this date already exists. Would you like to edit your existing entry?");
      if (prepopulate) {
        var currentDate = $scope.allEntries[$scope.dateMatch];
        $scope.newDailyEntry = currentDate;
      }
      else {
        $scope.newDailyEntry.date = null;
      }
    } else {
      $scope.newDailyEntry._id = null;
    }
  }
}

var addLongEntryController = function($scope, $http, $location) {
  $('.datepicker').datepicker({
    format: 'mm/dd/yyyy',
    autoclose: true,
    todayHighlight: true
  });
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
}

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

  }
}

var studentDataController = function($scope, $http, $state) {

  $scope.setType = function(dataType){
    $scope.dataTypeSelected = dataType;
    console.log('getDataEntries for', $scope.currentStudent.name);
    $http.get('/api/student/data/' + $scope.currentStudent._id + '/' + dataType)
      .then(function successCallback(response) {
        console.log(response.data);
        if(response.data[0] == undefined){
          $scope.dateSelected = "No data available";
          $scope.isData = false;
        } else{
          $scope.currentDateList = response.data;
          $scope.dateSelected = response.data[0];
          $scope.isData = true;
        }
      }, function errorCallback(response) {
        console.log('Error: ' + response.data);
    });
  }

  $scope.getDateString = function(dateString){
    var date = new Date(dateString);
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate(); 
  }

  $scope.ifEmpty = function(data){
    if(data === '' || data === null || data === undefined) return 'No data.';
    else return data;
  }

  $scope.showIssues = function(issues){
    issues = $scope.ifEmpty(issues);
    if(issues === 'No data.') return issues;
    else {
      newIssues = '';
      for(var k in issues) newIssues = newIssues + ', ' + k;
      return newIssues.substring(2);
    }
  }

  $scope.setDate = function(date){
    $scope.dateSelected = date;
  }

  $scope.isData = false; // for showing 'No data available' text
  $scope.dataTypes = ['Daily', 'Monthly', 'Bimonthly', 'Nineweeks', 'Semester'];
  // Initial state views last daily entry
  $scope.currentDateList = [];
  $scope.setType('Daily');
}
