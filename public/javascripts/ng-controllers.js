springInitiative.controller('loginController', function($scope, $http, $state) {
  $scope.login = function() {
    $http.post('login', {
      username: $scope.email,
      password: $scope.password
    }).then(function(response) {
      $state.go(response.data.redirect);
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
        console.log(msg);
      }
    });
  }

  $scope.register = function() {
    var data = {
      username: $scope.email,
      password: $scope.password
    };
    $http.post('register', data).then(function(response) {
      $scope.verification_alert = true;
      // window.location.href = response.data.redirect;
    }, function(response) {
      console.log('error: %s', response.data);
    });
  }
});



springInitiative.controller('indexController', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {
  $scope.students = [];

  $scope.user = $rootScope.loggedInUser;
  console.log($rootScope.loggedInUser);

  $http.get('/user').then(function(data) {
    $scope.user = data.data.user
  })

  $http.get('/api/allStudents').then(function(data) {
    $scope.students = data.data;
  }, function(err) {
    console.log('Error: in GET \'/student\'', err);
  });
}]);

springInitiative.controller('overviewController', function($scope, $rootScope, $http, $location) {});

springInitiative.controller('programController', function($scope, $rootScope, $http, $location) {
  $scope.programName = 'something spring';
  $scope.programInfo = ':3';
});

springInitiative.controller('studentController', function($scope, $http) {

  $scope.getStudent = function(student) {
    $http.get('api/student/' + student._id)
      .success(function(data) {
        $scope.currentStudent = data.currentStudent;
        $scope.allStudents = data.allStudents;
        $scope.showStudent = !$scope.showStudent;

      })
      .error(function(data) {
        console.log('Error: ' + data)
      })
  };

  $scope.addStudent = function() {
    $http.post('api/student/add', $scope.newStudent)
      .success(function(data) {
        $scope.allStudents = data.allStudents;
        $scope.newStudent = data.newStudent;
      })
      .error(function(data) {
        console.log('Error: ' + data)
      })
  };

  $scope.editStudentFunc = function(student) {
    $http.post('api/student/edit/' + student._id, student)
      .success(function(data) {
        $scope.selected = $scope.allStudents[0];
        $scope.allStudents = data;
      })
      .error(function(data) {
        console.log('Error: ' + data)
      })
  };

  $scope.newEntryFunc = function(student) {
    $http.post('api/student/newEntry/' + student._id, $scope.newEntry)
      .success(function(data) {
        $scope.allStudents = data.allStudents;
        $scope.currentStudent = data.currentStudent;
      })
      .error(function(data) {
        console.log('Error: ' + data)
      })
  };

  // TODO: .success and .error are deprecated
  $scope.getArchive = function() {
    $http.get('api/index/archive')
      .success(function(data) {
        $scope.allArchivedStudents = data
      })
      .error(function(data) {
        console.log('Error:' + data)
      })
  };

});

springInitiative.controller('addStudentController', function($scope, $rootScope, $http, $location) {});

springInitiative.controller('settingsController', function($scope, $rootScope, $http, $location) {});
