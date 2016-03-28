/*
*    main.js: Angular controller. Controls DOM, sets and interacts with $scope variables 
*    to facilitate the GET/POST requests.
*/

var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
    //Changes what will be displayed in the main box
    //of the website
    $routeProvider
        .when('/index', {
            templateUrl: '../views/index.html',
            controller: 'indexController'
        })

        .when('/', {
            templateUrl: '../views/login.html',
            controller: 'loginController'
        })
});

app.controller('indexController', function($scope, $http){
    $scope.students = [];

    $http({
          method: 'GET',
          url: '/student'
        })
         .success(function(data){
            console.log('test');
             $scope.students = data;
         })
         .error(function(err){
             console.log('Error: in GET \'/student\'', err);
         });

    $scope.showStudents=function(){
        // var ourSVG = angular.element( document.querySelector('#sentimentMap'));
        // ourSVG.empty(); // prevents multiple maps being appended to this element of the document
        // $scope.getData('senti', '#sentimentMap');
    }; 
 });

app.controller('loginController', function($scope, $http){
});