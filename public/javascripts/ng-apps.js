var springInitiative = angular.module('springInitiativeApp', ['ui.router']);

springInitiative.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

    .state('student', {
      url: '/student',
      templateUrl: 'views/partial-student.html',
      controller: 'mainController'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'views/partial-login.html',
      controller: 'loginCtrl'
    })

    .state('index', {
      url: '/',
      views: {
        '': {
            templateUrl: 'views/index.html',
            controller: 'indexController',
        },
        'content@index': {
            templateUrl: 'views/overview.html',
            controller: 'overviewController'
        }
      }
    })
    /* Page views */
    .state('index.program', {
      views: {
        'content': {
            templateUrl: 'views/program.html',
            controller: 'programController'
        }
      }
    })
    .state('index.student', {
      views: {
        'content': {
            templateUrl: 'views/student.html',
            controller: 'studentController',
        }
      }
    })
    .state('index.addStudent', {
      views: {
        'content': {
            templateUrl: 'views/addStudent.html',
            controller: 'addStudentController'
        }
      }
    })
    .state('index.settings', {
      views: {
        'content': {
            templateUrl: 'views/settings.html',
            controller: 'settingsController'
        }
      }
    });

});
