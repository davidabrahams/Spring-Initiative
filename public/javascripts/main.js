var Page = angular.module('page', ['ngRoute']);

Page.config(function($routeProvider) {
    //Changes what will be displayed in the main box of the website
    $routeProvider
        .when('/', {
            templateUrl: '../../view/index.html',
            controller: 'mainController'
        })

        .when('/index', {
            templateUrl: 'html/new-topic.html',
            controller: 'addTopicController'
        });
});

CardWiki.controller('mainController', function($scope, $filter, $http) {
    // create a message to display in our view
    $scope.message = 'Explore this website of card games!';
});