/*
*    main.js: Angular controller. Controls DOM, sets and interacts with $scope variables 
*    to facilitate the GET/POST requests. Controls routing.
*/

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        /* Home page */
        .state('index', {
          url: '/',
          views: {
            '': {
                templateUrl: '/views/index.html',
                controller: 'indexController',
            },
            'content@index': {
                templateUrl: '/views/overview.html',
                controller: 'overviewController'
            }
          }
        })
        /* Authentication */
        .state('login', {
          url: '/login',
          templateUrl: '/views/login.html',
          controller: 'loginController'
        })
        /* Page views */
        .state('index.program', {
          views: {
            'content': {
                templateUrl: '/views/program.html',
                controller: 'programController'
            }
          }
        })
        .state('index.student', {
          views: {
            'content': {
                templateUrl: '/views/student.html',
                controller: 'studentController',
            }
          }
        })
        .state('index.addStudent', {
          views: {
            'content': {
                templateUrl: '/views/addStudent.html',
                controller: 'addStudentController'
            }
          }
        })
        .state('index.settings', {
          views: {
            'content': {
                templateUrl: '/views/settings.html',
                controller: 'settingsController'
            }
          }
        });

    $urlRouterProvider.otherwise('/'); //if invalid URL

    // Get rid of '#' in /#/routename
    if(window.history && window.history.pushState){
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
});

// Redirect if not logged in
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