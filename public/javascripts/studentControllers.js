var studentController = function($scope, $http, $state) {

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
  };

  $scope.getArchive = function() {
    $http.get('api/index/archive').then(function successCallback(response) {
      $scope.allArchivedStudents = response.data;
    }, function errorCallback(response) {
      console.log('Error:' + response.data);
    });
  };
};

var addDailyEntryController = function($scope, $http, $location) {

  $scope.popup1 = {
    opened: false
  };

  $scope.slider = {
    value: 3,
    options: {
      showSelectionBar: true,
      getPointerColor: function(value) { return '#308a83'; },
      getSelectionBarColor: function(value) { return '#eee'; }
    }
  };

  $scope.newDailyEntry = {engageContent: 5, engagePeer: 5, engageAdult: 5};
  $scope.dateMatch = -1;
  $scope.allEntries = null;

  // get all entries for the current student to make sure we dont make an entry
  // for a date that already has one
  var req = {studentID: $scope.currentStudent._id};
  $http.get('/api/student/allEntries', {params: req})
  .then(function successCallback(response) {
    $scope.allEntries = response.data;
  }, function errorCallback(response) {
      console.log('Error: ' + response.data);
  });

  $scope.submitNewDailyEntry = function(student) {
    $http.post('api/student/newDailyEntry/' + student._id, $scope.newDailyEntry)
    .then(function successCallback(response) {
      $scope.entrySubmittedMsg = response.data.msg;
      $scope.newDailyEntry = {engageContent: 5, engagePeer: 5, engageAdult: 5};
      // update the document locally too
      // updateLocalEntries();
      if ($scope.dateMatch !== -1) {
        $scope.allEntries[$scope.dateMatch] = response.data.newEntryObj;
      } else {
        $scope.allEntries.push(response.data.newEntryObj);
      }
    }, function errorCallback(response) {
      console.log('Error: ' + response.data);
      $scope.entrySubmittedMsg = response.data.msg;
    });
  };

  $scope.dateChange = function() {
    $scope.dateMatch = -1;
    $scope.allEntries.forEach(function (entry, i) {
      var date = new Date(entry.date);
      var year1 = date.getFullYear();
      var month1 = date.getMonth();
      var day1 = date.getDate();
      var year2 = $scope.newDailyEntry.date.getFullYear();
      var month2 = $scope.newDailyEntry.date.getMonth();
      var day2 = $scope.newDailyEntry.date.getDate();
      if (year1 == year2 && month1 == month2 && day1 == day2) {
        $scope.dateMatch = i;
      }
    });
    if ($scope.dateMatch !== -1) {
      var prepopulate = window.confirm("A entry for this date already exists. Would you like to edit your existing entry?");
      if (prepopulate) {
        var currentDate = $scope.allEntries[$scope.dateMatch];
        $scope.newDailyEntry = currentDate;
        $scope.newDailyEntry.date = new Date(currentDate.date);
      }
      else {
        $scope.newDailyEntry.date = null;
      }
    } else {
      $scope.newDailyEntry._id = null;
    }
  };
};

var addLongEntryController = function($scope, $http, $location) {

  $scope.popup1 = {
    opened: false
  };

  $scope.submitLongEntry = function(student) {
    $http.post('api/student/newLongEntry/' + student._id, $scope.newLongEntry)
    .then(function successCallback(response) {
      $scope.newLongEntry = null;
      $scope.entrySubmittedMsg = response.data.msg;
    }, function errorCallback(response) {
      console.log('Error: ' + response.data);
      $scope.entrySubmittedMsg = response.data.msg;
    });
  };
};

var addStudentController = function($scope, $http, $location) {
  $scope.addStudent = function() {
    $http.post('api/student/add', $scope.newStudent).then(function successCallback(
      response) {
      $scope.$parent.students = response.data.allStudents;
      $scope.newStudent = null;
      $scope.studentAddedMsg = response.data.msg;
    }, function errorCallback(response) {
      console.log('Error: ' + response.data);
      $scope.studentAddedMsg = response.data.msg;
    });

  };
};

var studentDataController = function($scope, $http, $state) {
  $scope.thisMonth = new Date();

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
          $scope.yearIndexList = createYearList(response.data);
          $scope.monthIndexList = createMonthList(response.data);
          $scope.dayIndexList = createDayList(response.data);
          $scope.isData = true;
        }
      }, function errorCallback(response) {
        console.log('Error: ' + response.data);
    });
  };

  $scope.ifEmpty = function(data){
    if(data === '' || data === null || data === undefined) return 'No data.';
    else return data;
  };

  $scope.showIssues = function(issues){
    issues = $scope.ifEmpty(issues);
    if(issues === 'No data.') return issues;
    else {
      newIssues = '';
      for(var k in issues) newIssues = newIssues + ', ' + k;
      return newIssues.substring(2);
    }
  };

  $scope.setYear = function(date){
    $scope.dateSelected = date;
    $scope.monthIndexList = createMonthList($scope.currentDateList);
  }

  $scope.setMonth = function(date){
    $scope.dateSelected = date;
    $scope.dayIndexList = createDayList($scope.currentDateList);
  }

  $scope.setDay = function(date){
    $scope.dateSelected = date;
  }

  var createYearList = function(entryList){
    var distinctYears = [];
    var indexList = [];
    for (var i = 0; i < entryList.length; i++) {
      var year = new Date(entryList[i].date).getFullYear();
      // if date is not in array
      if(distinctYears.indexOf(year) < 0){ // indexOf does not work in IE8
        distinctYears.push(year);
        indexList.push(i);
      }
    }
    return indexList;
  }

  var createMonthList = function(entryList){
    var year = new Date($scope.dateSelected.date).getFullYear();
    var distinctMonths = [];
    var indexList = [];
    for (var i = 0; i < entryList.length; i++) {
      var month = new Date(entryList[i].date).getMonth();
      // if date is not in array and is in proper year
      if(new Date(entryList[i].date).getFullYear() === year &&
          distinctMonths.indexOf(month) < 0){ // indexOf does not work in IE8
        distinctMonths.push(month);
        indexList.push(i);
      }
    }
    return indexList;
  }

  var createDayList = function(entryList){
    var year = new Date($scope.dateSelected.date).getFullYear();
    var month = new Date($scope.dateSelected.date).getMonth();
    var distinctDays = [];
    var indexList = [];
    for (var i = 0; i < entryList.length; i++) {
      var day = new Date(entryList[i].date).getDate();
      // if date is not in array and is in proper year and month
      if(new Date(entryList[i].date).getFullYear() === year &&
          new Date(entryList[i].date).getMonth() === month &&
          distinctDays.indexOf(day) < 0){ // indexOf does not work in IE8
        distinctDays.push(day);
        indexList.push(i);
      }
    }
    return indexList;
  }

  $scope.isData = false; // for showing 'No data available' text
  $scope.dataTypes = ['Daily', 'Monthly', 'Bimonthly', 'Nineweeks', 'Semester'];
  // Initial state views last daily entry
  $scope.currentDateList = [];
  $scope.setType('Daily');

};
