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

springInitiative.controller('programController', function($scope, $http, $location) {
  $scope.programName = 'something spring';
  $scope.programInfo = ':3';
});

springInitiative.controller('d3Controller', function($scope, $http, $state){
    $http.get('/api/student/data/'+ $scope.currentStudent._id).then(function successCallback(response){
        $scope.attendance = response.data.attendanceList;
        $scope.dates = response.data.datesList;
        $scope.stars = response.data.starsList;

        var count = {}; 
        //creating a dictionary mapping elements to their counts in a list
        //http://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript
        $scope.attendance.forEach(function(i) { count[i] = (count[i]||0)+1;  });

        var dataList = [];
        var keys = Object.keys(count);

        for(var i = 0; i < keys.length; i++){
          console.log(count)
          dataList.push({key:keys[i], y:count[keys[i]]})
        }
        console.log(dataList)
         $scope.options = {
            chart: {
              type: 'pieChart',
              height: 500,
              x: function(d){return d.key;},
              y: function(d){return d.y;},
              showLabels: true,
              duration: 500,
              labelThreshold: 0.01,
              labelSunbeamLayout: true,
              legend: {
                margin: {
                  top: 5,
                  right: 35,
                  bottom: 5,
                  left: 0
                }
              }
            }
          };

        $scope.data = dataList;

        $scope.options2 = {
            chart: {
                type: 'historicalBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 65,
                    left: 50
                },
                x: function(d){return d[0];},
                y: function(d){return d[1]/100000;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.1f')(d);
                },
                duration: 100,
                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d) {
                        return d3.time.format('%x')(new Date(d))
                    },
                    rotateLabels: 30,
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: -10,
                    tickFormat: function(d){
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

        var datalist2 = [];
        for (var i =0; i < $scope.stars.length; i++){
          datalist2.push([$scope.dates[i], $scope.stars[i]])
        }

        console.log(datalist2)

        $scope.data2 = [
            {
                "key" : "Quantity" ,
                "bar": true,
                "values": datalist2
                // "values" : [ [ 1136005200000 , 1271000.0] , [ 1138683600000 , 1271000.0] , [ 1141102800000 , 1271000.0] , [ 1143781200000 , 0] , [ 1146369600000 , 0] , [ 1149048000000 , 0] , [ 1151640000000 , 0] , [ 1154318400000 , 0] , [ 1156996800000 , 0] , [ 1159588800000 , 3899486.0] , [ 1162270800000 , 3899486.0] , [ 1164862800000 , 3899486.0] , [ 1167541200000 , 3564700.0] , [ 1170219600000 , 3564700.0] , [ 1172638800000 , 3564700.0] , [ 1175313600000 , 2648493.0] , [ 1177905600000 , 2648493.0] , [ 1180584000000 , 2648493.0] , [ 1183176000000 , 2522993.0] , [ 1185854400000 , 2522993.0] , [ 1188532800000 , 2522993.0] , [ 1191124800000 , 2906501.0] , [ 1193803200000 , 2906501.0] , [ 1196398800000 , 2906501.0] , [ 1199077200000 , 2206761.0] , [ 1201755600000 , 2206761.0] , [ 1204261200000 , 2206761.0] , [ 1206936000000 , 2287726.0] , [ 1209528000000 , 2287726.0] , [ 1212206400000 , 2287726.0] , [ 1214798400000 , 2732646.0] , [ 1217476800000 , 2732646.0] , [ 1220155200000 , 2732646.0] , [ 1222747200000 , 2599196.0] , [ 1225425600000 , 2599196.0] , [ 1228021200000 , 2599196.0] , [ 1230699600000 , 1924387.0] , [ 1233378000000 , 1924387.0] , [ 1235797200000 , 1924387.0] , [ 1238472000000 , 1756311.0] , [ 1241064000000 , 1756311.0] , [ 1243742400000 , 1756311.0] , [ 1246334400000 , 1743470.0] , [ 1249012800000 , 1743470.0] , [ 1251691200000 , 1743470.0] , [ 1254283200000 , 1519010.0] , [ 1256961600000 , 1519010.0] , [ 1259557200000 , 1519010.0] , [ 1262235600000 , 1591444.0] , [ 1264914000000 , 1591444.0] , [ 1267333200000 , 1591444.0] , [ 1270008000000 , 1543784.0] , [ 1272600000000 , 1543784.0] , [ 1275278400000 , 1543784.0] , [ 1277870400000 , 1309915.0] , [ 1280548800000 , 1309915.0] , [ 1283227200000 , 1309915.0] , [ 1285819200000 , 1331875.0] , [ 1288497600000 , 1331875.0] , [ 1291093200000 , 1331875.0] , [ 1293771600000 , 1331875.0] , [ 1296450000000 , 1154695.0] , [ 1298869200000 , 1154695.0] , [ 1301544000000 , 1194025.0] , [ 1304136000000 , 1194025.0] , [ 1306814400000 , 1194025.0] , [ 1309406400000 , 1194025.0] , [ 1312084800000 , 1194025.0] , [ 1314763200000 , 1244525.0] , [ 1317355200000 , 475000.0] , [ 1320033600000 , 475000.0] , [ 1322629200000 , 475000.0] , [ 1325307600000 , 690033.0] , [ 1327986000000 , 690033.0] , [ 1330491600000 , 690033.0] , [ 1333166400000 , 514733.0] , [ 1335758400000 , 514733.0]]
            }];

    }, function errorCallback(response){
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
    }, function errorCallback(response) {
        console.log('Error: ' + response.data);
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
      // TODO: do something on success?
    }, function errorCallback(response) {
      console.log('Error: ' + response.data);
    });
  }
});

springInitiative.controller('addStudentController', function($scope, $http, $location) {
  $scope.addStudent = function() {
    $http.post('api/student/add', $scope.newStudent).then(function successCallback(response) {
      $scope.$parent.students = response.data.allStudents;
      $scope.newStudent = response.data.newStudent;
    }, function errorCallback(response) {
        console.log('Error: ' + response.data);
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
