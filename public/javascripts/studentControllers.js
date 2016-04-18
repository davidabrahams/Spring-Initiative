var studentController = function($scope,  $http, $state) {

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

var studentDataController = function($scope, $http, $location) {
  $scope.currentStudent = $scope.$parent.currentStudent;

  $http.get('/api/student/data/'+$scope.currentStudent._id)
    .then(function successCallback(response) {
      console.log('get student response:', response.data);

    }, function errorCallback(response) {
      console.log('Error: ' + response.data);
      $scope.studentAddedMsg = response.data.msg;
  });

  $scope.dataTypes = ['daily', 'monthly', 'bimonthly', '9 weeks', 'semester'];
  $scope.dailyEntries = ['sunday','monday','wednesday','friday','saturday'];
  $scope.monthlyEntries = ['april', 'may', 'june', 'july', 'august'];
  // Initial state views last daily entry
  $scope.dataTypeSelected = 'daily';
  $scope.dateSelected = $scope.dailyEntries[0];

  $scope.currentDateList = $scope.dailyEntries;

  $scope.setType = function(dataType){
    $scope.dataTypeSelected = dataType;
    if(dataType === 'daily'){
      $scope.currentDateList = $scope.dailyEntries;
      $scope.dateSelected = $scope.dailyEntries[0];
    } else if(dataType === 'monthly'){
      $scope.currentDateList = $scope.monthlyEntries;
      $scope.dateSelected = $scope.monthlyEntries[0];
    } else if(dataType === 'bimonthly') {
      $scope.currentDateList = $scope.monthlyEntries;
      $scope.dateSelected = $scope.monthlyEntries[0];
    } else if(dataType === '9 weeks') {
      $scope.currentDateList = $scope.monthlyEntries;
      $scope.dateSelected = $scope.monthlyEntries[0];
    } else if(dataType === 'semester') {
      $scope.currentDateList = $scope.monthlyEntries;
      $scope.dateSelected = $scope.monthlyEntries[0];
    }
  }

  $scope.setDate = function(date){
    $scope.dateSelected = date;
  }
}