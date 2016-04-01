var springInitiative = angular.module('springInitiativeApp', ['ui.router']);

springInitiative.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/login');

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
    });

});
