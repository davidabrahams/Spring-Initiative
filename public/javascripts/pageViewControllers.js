app.controller('indexController', function($scope, $rootScope, $http, $state, $stateParams, $location){
    $scope.students = [];
    $scope.currentStudent;
    $scope.user = $rootScope.loggedInUser; //TODO: make this show on refresh

    $http({
          method: 'GET',
          url: '/student'
        })
        .success(function(data){
            $scope.students = data.students;
         })
        .error(function(err){
             console.log('Error: in GET \'/student\'', err);
        }
    );

    $scope.setStudent = function (student){
        console.log('clicking', student.name);
        $scope.currentStudent = student;
        $state.go('content@index', {}, {reload: true}); //second parameter is for $stateParams
    };
});

app.controller('overviewController', function($scope, $rootScope, $http, $location){
});

app.controller('programController', function($scope, $rootScope, $http, $location){
    $scope.programName = 'something spring';
    $scope.programInfo = ':3';
});

app.controller('studentController', function($scope, $rootScope, $http, $location, $state, $stateParams){
    // $scope.student = $scope.$parent.currentStudent;
    // $state.reload();
    console.log('parent', $scope.$parent.currentStudent);
    $scope.studentName = 'sd';
    $scope.studentInfo = 'woooohwee :^)';
});

app.controller('addStudentController', function($scope, $rootScope, $http, $location){
});

app.controller('settingsController', function($scope, $rootScope, $http, $location){
});