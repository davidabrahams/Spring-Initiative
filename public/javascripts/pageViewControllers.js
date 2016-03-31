app.controller('indexController', function($scope, $rootScope, $http, $location){
    $scope.students = [];
    
    // checkUser($rootScope, $location, $http);
    console.log('this should be second');
    $scope.user = $rootScope.loggedInUser;

    $http({
          method: 'GET',
          url: '/student'
        })
        .success(function(data){
            console.log(data.students);
            $scope.students = data.students;
         })
        .error(function(err){
             console.log('Error: in GET \'/student\'', err);
        }
    );

    // $scope.showStudent = function(student){
    //     $scope.contentTitle = student.name;
    //     $scope.contentText = 'Here you can see ' + student.name + '\'s information.';
    // }
});

app.controller('overviewController', function($scope, $rootScope, $http, $location){
});

app.controller('programController', function($scope, $rootScope, $http, $location){
    $scope.programName = 'something spring';
    $scope.programInfo = ':3';
});

app.controller('studentController', function($scope, $rootScope, $http, $location){
    $scope.studentName = 'd';
    $scope.studentInfo = 'we';
});

app.controller('addStudentController', function($scope, $rootScope, $http, $location){
});

app.controller('settingsController', function($scope, $rootScope, $http, $location){
});