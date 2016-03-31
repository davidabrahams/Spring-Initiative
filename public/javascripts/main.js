/*
*    main.js: Angular controller. Controls DOM, sets and interacts with $scope variables 
*    to facilitate the GET/POST requests. Controls routing.
*/

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    // $urlRouterProvider.otherwise('/'); //if invalid URL

    $stateProvider
        .state('index', {
          url: '/',
          views: {
            '': {
                templateUrl: '/views/index.html',
                controller: 'indexController',
            },
            'overview@index': {
                templateUrl: '/views/overview.html',
                controller: 'overviewController'
            },
            'program@index': {
                templateUrl: '/views/program.html',
                controller: 'programController'
            },
            'student@index': {
                templateUrl: '/views/student.html',
                controller: 'studentController',
                params: {
                  student: {value: 'some object'}
                }
            }
          }
        })
        .state('login', {
          url: '/login',
          templateUrl: '/views/login.html',
          controller: 'loginController'
        })
        .state('program', {
          url: '/',
          templateUrl: '/views/program.html'
        })
        .state('student', {
          url: '/',
          templateUrl: '/views/student.html'
    });

    // Get rid of '#' in /#/routename
    if(window.history && window.history.pushState){
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
});

// Control redirection if not logged in
app.run(function($rootScope, $location, $http) {
    $rootScope.$on('$stateChangeStart', function(event, next, current) {
        $http({
          method: 'GET',
          url: '/user'
        })
        .success(function(data){
            console.log('Current user:', data.user);
            if (data.user == null) {
                console.log('No one logged in, redirecting to /login');
                // no logged user, redirect to /login if not on page
                if ( next.templateUrl === 'views/login.html') {}
                else { $location.path('/login'); }
            } else { $rootScope.loggedInUser = data.user.email; 
                console.log($rootScope.loggedInUser + ' is logged in.');}
         })
        .error(function(err){
             console.log('Error: in GET \'/user\'', err);
        });
    });
});

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

    $scope.showStudent = function(student){
        $scope.contentTitle = student.name;
        $scope.contentText = 'Here you can see ' + student.name + '\'s information.';
    }
});

app.controller('overviewController', function($scope, $rootScope, $http, $location){
});

app.controller('studentController', function($scope, $rootScope, $http, $location){
    $scope.studentName = 'd';
    $scope.studentInfo = 'we';
});

app.controller('programController', function($scope, $rootScope, $http, $location){
});