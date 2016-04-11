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

springInitiative.controller('indexController', function($scope, $rootScope, $http, $location, $state) {

  $scope.students = [];

  $http.get('/user').then(function(data) {
    $scope.user = data.data.user
    console.log("Current user: " + $scope.user.email);

  })

  $scope.logout = function(){
    $http.post("/api/logout")
    .success(function(data){
      $state.go('login')
    })
    .error(function(data){
      console.log("Error: "+data);
    })
  }

  $http.get('/api/allStudents').then(function(data) {
    $scope.students = data.data;
  }, function(err) {
    console.log('Error: in GET \'/student\'', err);
  });

  $scope.showStudent = function(student){
    $rootScope.currentStudent = student;
    $rootScope.editStudent = angular.copy(student);
    $http.get('/api/student/data/'+ $rootScope.currentStudent._id)
      .success(function(data){
        $scope.studentData = data;
        $scope.options = {width: 500, height: 300, 'bar': 'aaa'};
        $scope.data = $scope.studentData
        $scope.hovered = function(d){
            $scope.barValue = d;
            $scope.$apply();
        };
        $scope.barValue = 'None';
      })
      .error(function(data) {
          console.log('Error: ' + data);
      });
  }
}).directive('barChart', function(){
    var chart = d3.custom.barChart();
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="chart"></div>',
        scope:{
            height: '=height',
            data: '=data',
            hovered: '&hovered'
        },
        link: function(scope, element, attrs) {
            var chartEl = d3.select(element[0]);
            chart.on('customHover', function(d, i){
                scope.hovered({args:d});
            });

            scope.$watch('data', function (newVal, oldVal) {
                chartEl.datum(newVal).call(chart);
            });

            scope.$watch('height', function(d, i){
                chartEl.call(chart.height(scope.height));
            })
        }
    }
  })
  // .directive('chartForm', function(){
  //   return {
  //       restrict: 'E',
  //       replace: true,
  //       controller: function AppCtrl ($scope) {
  //           $scope.update = function(d, i){ $scope.data = randomData(); };
  //           function randomData(){
  //               return d3.range(~~(Math.random()*50)+1).map(function(d, i){return ~~(Math.random()*1000);});
  //           }
  //       },
  //       template: '<div class="form">' +
  //               'Height: {{options.height}}<br />' +
  //               '<input type="range" ng-model="options.height" min="100" max="800"/>' +
  //               '<br /><button ng-click="update()">Update Data</button>' +
  //               '<br />Hovered bar data: {{barValue}}</div>'
  //   }});;

springInitiative.controller('overviewController', function($scope, $rootScope, $http, $location) {});

springInitiative.controller('programController', function($scope, $rootScope, $http, $location) {
  $scope.programName = 'something spring';
  $scope.programInfo = ':3';
});

springInitiative.controller('studentController', function($scope,  $rootScope, $http, $state) {

  $scope.$state = $state;
  //TODO: check these and make sure they work
  $scope.submitEditStudent = function(editStudent, currentStudent) {
    $http.post('api/student/edit/' + currentStudent._id, editStudent)
      .success(function(data) {
        $scope.$parent.students = data.allStudents;
        $rootScope.currentStudent = data.currentStudent;
        // $scope.currentStudent = data.currentStudent;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  }

  $scope.submitNewEntry = function(student) {

    $http.post('api/student/newEntry/' + student._id, $scope.newEntry)
      .success(function(data) {
        $scope.$parent.students = data.allStudents;
        $rootScope.currentStudent = data.currentStudent;
        // console.log(currentStudent)
        //TODO: need to test these since I don't know how to show/see new edits
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  }

  // TODO: .success and .error are deprecated
  $scope.getArchive = function() {
    $http.get('api/index/archive')
      .success(function(data) {
        $scope.allArchivedStudents = data;
        //TODO: update archived stuff
      })
      .error(function(data) {
        console.log('Error:' + data);
      });
  }

})

springInitiative.controller('addStudentController', function($scope, $rootScope, $http, $location){
  $scope.addStudent = function() {
    $http.post('api/student/add', $scope.newStudent)
      .success(function(data) {
        $scope.$parent.students = data.allStudents;
        $scope.newStudent = data.newStudent;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      })
  };
});

springInitiative.controller('settingsController', function($scope, $rootScope, $http, $location){

  $http.get('api/allUsers')
  .success(function(data) {
    $scope.allUsers = data;
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

  $scope.toggleAdmin = function(username) {
    $http.post('api/changeAdmin/'+username._id)
    .success(function(data) {
      username.isAdmin = !username.isAdmin;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

  $scope.changePassword = function(user) {
    if($scope.currentPassword1 === $scope.currentPassword2 && $scope.currentPassword1 != undefined){
      $http.post('api/changePassword/'+user._id,{
        password: $scope.currentPassword1
      }).success(function(data) {
        $scope.form_change_password.$setPristine();
        $scope.currentPassword1 = null;
        $scope.currentPassword2 = null;
        $scope.passwordMatchError = null;
        $scope.passwordChangeMsg = data.msg;
        // this clears focus from the form!
        $('#chngPassword2').focus();
        $('#chngPassword2').blur();
      })
      .error(function(data) {
        $scope.passwordMatchError = null;
        $scope.passwordChangeMsg = data.msg;
      });
    }else{
      $scope.passwordMatchError = "Passwords do not match";
      $scope.passwordChangeMsg = null;
    }
  }
});
