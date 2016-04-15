springInitiative.controller('loginController', function($scope, $http, $state) {
  $scope.login = function() {
    $http.post('api/login', {
      username: $scope.email,
      password: $scope.password
    }).then(function(response) {
      $state.go('index');
    }, function(response) {
      var msg = response.data;
      if (msg === 'Incorrect username' || msg ===
        'User did not verify email!') {
        $('#email-group').addClass('has-error');
        $('#password-group').removeClass('has-error');
        $scope.email_error = response.data;
        $scope.password_error = null;
        $scope.verification_alert = false;
      } else if (msg == 'Incorrect password') {
        $('#password-group').addClass('has-error');
        $('#email-group').removeClass('has-error');
        $scope.password_error = response.data;
        $scope.email_error = null;
        $scope.verification_alert = false;
      } else {
        console.log('Error: ', msg);
      }
    });
  }

  $scope.register = function() {
    var data = {
      username: $scope.email,
      password: $scope.password
    };
    $http.post('api/register', data).then(function(response) {
      $scope.registerEmail = angular.copy($scope.email);
      $scope.verification_alert = true;
    }, function(response) {
      console.log('error: %s', response.data);
    });
  }
});


springInitiative.controller('indexController', function($scope, $http,
                            $location, $state) {

  $scope.students = [];

  $http.get('/user').then(function(data) {
    $scope.user = data.data.user
    console.log("Current user: " + $scope.user.email);

  })

  $scope.logout = function(){
    $http.post("/api/logout").then(function successCallback(response) {
      $state.go('login');
    }, function errorCallback(response) {
      console.log("Error: " + data);
    });
  }

  $http.get('/api/allStudents').then(function(data) {
    $scope.students = data.data;
  }, function(err) {
    console.log('Error: in GET \'/student\'', err);
  });

  $scope.showStudent = function(student){
    $scope.currentStudent = student;
    $scope.editStudent = angular.copy(student);
  }
});

springInitiative.controller('overviewController', function($scope, $http, $location) {});

springInitiative.controller('d3Controller', function($scope, $http, $state) {
  $http.get('/api/student/data/' + $scope.currentStudent._id).then(function successCallback(
    response) {
    $scope.attendance = response.data.attendanceList;
    $scope.dates = response.data.datesList;

    $scope.stars = response.data.starsList;

    var attendenceCount = {};
    //creating a dictionary mapping elements to their counts in a list
    //http://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript
    $scope.attendance.forEach(function(i) {
      attendenceCount[i] = (attendenceCount[i] || 0) + 1;
    });

    var attendanceDataList = [];
    //finding the keys for each item in the object just created
    //to be used in the data set up for the viz
    var attendenceKeys = Object.keys(attendenceCount);

    //creating the necessary data set up for the viz
    //[{key:, y:},{},{}], where key is "Absent" and "y" is the # of times
    for (var i = 0; i < attendenceKeys.length; i++) {
      attendanceDataList.push({
        key: attendenceKeys[i],
        y: attendenceCount[attendenceKeys[i]]
      })
    }

    //options to create pie chart
    $scope.pieOptions = {
      chart: {
        type: 'pieChart',
        height: 500,
        x: function(d) { return d.key; },
        y: function(d) { return d.y; },
        showLabels: true,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: { margin: { top: 5, right: 35, bottom: 5, left: 0 } }
      }
    };
    //setting attendance data for plotting to angular var
    $scope.attendanceData = attendanceDataList;

    //options to create time based chart
    $scope.histOptions = {
      chart: {
        type: 'historicalBarChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 65,
          left: 50
        },
        x: function(d) {
          return d[0];
        },
        y: function(d) {
          return d[1]
        },
        showValues: true,
        valueFormat: function(d) {
          return d3.format(',.1f')(d);
        },
        duration: 100,
        xAxis: {
          axisLabel: 'Dates',
          tickFormat: function(d) {
            return d3.time.format('%x')(new Date(d))
          },
          rotateLabels: 30,
          showMaxMin: false
        },
        yAxis: {
          axisLabel: 'Stars Achived',
          axisLabelDistance: -10,
          tickFormat: function(d) {
            return d3.format(',.1f')(d);
          }
        },
        tooltip: {
          keyFormatter: function(d) {
            return d3.time.format('%x')(new Date(d));
          }
        },
        zoom: {
          enabled: true,
          scaleExtent: [1, 10],
          useFixedDomain: false,
          useNiceScale: false,
          horizontalOff: false,
          verticalOff: true,
          unzoomEventType: 'dblclick.zoom'
        }
      }
    };

    //creating a list in format for viz
    //[[num, num], [num, num]] where first num corresponds to date and second is value
    var dateData = [];
    for (var i = 0; i < $scope.stars.length; i++) {
      dateData.push([Number(new Date($scope.dates[i])), $scope.stars[i]])
    }

    //setting this new datalist to angular var for plotting
    $scope.histData = [{
      "key": "Quantity",
      "bar": true,
      "values": dateData
    }];
  }, function errorCallback(response) {
    console.log('Error: ' + response.data);
  })
});

springInitiative.controller('studentController', function($scope,  $http, $state) {

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

});

springInitiative.controller('addEntryController', function($scope, $http, $location) {
  $scope.submitNewEntry = function(student) {
    $http.post('api/student/newEntry/' + student._id, $scope.newEntry)
    .then(function successCallback(response) {
      $scope.entrySubmittedMsg = response.data.msg;
    }, function errorCallback(response) {
      console.log('Error: ' + response.data);
      $scope.entrySubmittedMsg = response.data.msg;

    });
  }
});

springInitiative.controller('addStudentController', function($scope, $http,
  $location) {
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
});

springInitiative.controller('settingsController', function($scope, $http, $location){

  $http.get('api/allUsers').then(function successCallback(response) {
    $scope.allUsers = response.data;
  }, function errorCallback(response) {
    console.log('Error: ' + response.data);
  });

  $scope.toggleAdmin = function(username) {
    $http.post('api/changeAdmin/'+username._id).then(function successCallback(response) {
      username.isAdmin = !username.isAdmin;
    }, function errorCallback(response) {
      console.log('Error: ' + response.data);
    });
  };

  $scope.changePassword = function(user) {
    if($scope.currentPassword1 === $scope.currentPassword2 && $scope.currentPassword1 != undefined){
      $http.post('api/changePassword/'+user._id,{
        password: $scope.currentPassword1
      }).then(function successCallback(response) {
        $scope.form_change_password.$setPristine();
        $scope.currentPassword1 = null;
        $scope.currentPassword2 = null;
        $scope.passwordMatchError = null;
        $scope.passwordChangeMsg = response.data.msg;
        // this clears focus from the form!
        $('#chngPassword2').focus();
        $('#chngPassword2').blur();
    }, function errorCallback(response) {
        $scope.passwordMatchError = null;
        $scope.passwordChangeMsg = response.data.msg;
    });
    } else {
      $scope.passwordMatchError = "Passwords do not match";
      $scope.passwordChangeMsg = null;
    }
  }
});
