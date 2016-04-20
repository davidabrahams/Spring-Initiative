var studentController = function($scope, $http, $state) {

  $scope.$state = $state;
  $scope.currentStudent = $scope.$parent.currentStudent;
  //TODO: check these and make sure they work
  $scope.submitEditStudent = function(editStudent, currentStudent) {
    $http.post('api/student/edit/' + currentStudent._id, editStudent)
    .then(function successCallback(response) {
      $scope.$parent.students = response.data.allStudents;
      $scope.$parent.currentStudent = response.data.currentStudent;
      $scope.studentEditMsg = response.data.msg;
      $('.submit').focus();
      $('.submit').blur();      
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

}

var addEntryController = function($scope, $http, $location) {
  // $scope.minSlider = {
  //   value: 10
  // };
  $scope.submitNewEntry = function(student) {
    $http.post('api/student/newEntry/' + student._id, $scope.newEntry)
    .then(function successCallback(response) {
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
  $scope.$state = $state;
  $scope.currentStudent = $scope.$parent.currentStudent;

  var getDataEntries = function(dataType){
    $http.get('/api/student/data/' + $scope.currentStudent._id + '/' + dataType)
      .then(function successCallback(response) {
        $scope.currentDateList = response.data;
        $scope.dateSelected = response.data[0] || "No dates available";
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

  $scope.dataTypes = ['Daily', 'Monthly', 'Bimonthly', 'Nineweeks', 'Semester'];
  // Initial state views last daily entry
  $scope.dataTypeSelected = 'Daily';
  $scope.currentDateList = [];
  getDataEntries($scope.dataTypeSelected);

  $scope.setType = function(dataType){
    $scope.dataTypeSelected = dataType;
    getDataEntries($scope.dataTypeSelected);
  }

  $scope.setDate = function(date){
    $scope.dateSelected = date;
  }
}