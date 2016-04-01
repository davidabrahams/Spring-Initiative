var springInitiative = angular.module('springInitiative', ['ngRoute']);

springInitiative.config(function($routeProvider) {
  $routeProvider
    .when('/student', {
      templateUrl: 'views/student.html',
      controller: 'mainController'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'loginCtrl'
    })
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'loginCtrl'
    })
});
