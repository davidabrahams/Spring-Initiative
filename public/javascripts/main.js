/*
*    main.js: Angular controller. Controls DOM, sets and interacts with $scope variables 
*    to facilitate the GET/POST requests.
*/

app.config(function($routeProvider) {
    //Changes what will be displayed in the main box
    //of the website
    $routeProvider
        .when('/', {
            templateUrl: '/views/index.html',
            controller: 'indexController'
        })

        .when('/login', {
            templateUrl: '/views/login.html',
            controller: 'loginController'
        }) 

        .otherwise({
        redirectTo: '/'
      });
});

app.controller('indexController', function($scope, $http){
    $scope.students = [];
    $scope.contentTitle = 'Welcome';
    $scope.contentText = 'Here you can see such and such information.';

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
        });

    $scope.showStudent = function(student){
        $scope.contentTitle = student.email;
        $scope.contentText = 'Here you can see ' + student.email + '\'s information.';
    }
});