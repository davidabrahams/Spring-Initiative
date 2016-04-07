var springInitiative = angular.module('springInitiativeApp', ['ui.router']);

springInitiative.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

    /* Page views */
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'loginController'
    })

    .state('index', {
      url: '/',
      views: {
        '': {
            templateUrl: 'views/index.html',
            controller: 'indexController',
        },
        'content@index': {
            templateUrl: 'views/content/overview.html',
            controller: 'overviewController'
        }
      }
    })

    /* Content views */
    .state('index.program', {
      views: {
        'content': {
            templateUrl: 'views/content/program.html',
            controller: 'programController'
        }
      }
    })
    .state('index.student', {
      views: {
        'content': {
          templateUrl: 'views/content/student.html',
          controller: 'studentController'
        }
      }
    })
    .state('index.addStudent', {
      views: {
        'content': {
            templateUrl: 'views/content/addStudent.html',
            controller: 'addStudentController'
        }
      }
    })
    .state('index.settings', {
      views: {
        'content': {
            templateUrl: 'views/content/settings.html',
            controller: 'settingsController'
        }
      }
    });

    $locationProvider.html5Mode(true);

});

springInitiative.run(function($rootScope, $state, $http) {
    $rootScope.$on('$stateChangeStart', function(event, next, current) {
        if (next.name !== 'login') {
          $http.get('/user').then(function(data) {
              if (data.data.user == null) {
                  console.log('No one logged in, redirecting to /login');
                    $state.go('login');
              }
           }, function(err){
               console.log('Error: in GET \'/user\'', err);
          });
      }
    });
});

