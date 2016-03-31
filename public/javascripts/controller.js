var springInitiative = angular.module('springInitiative', ['ngRoute']);

springInitiative.config(function($routeProvider) {
    $routeProvider
    .when('/student',{
        templateUrl: '../views/student.html',
        controller: 'mainController'
    })
    .when('/login', {
        templateUrl: '../views/login.html',
        controller: 'loginCtrl'
    })
    .when('/', {
        templateUrl: '../views/login.html',
        controller: 'loginCtrl'
    })
});


springInitiative.controller('loginCtrl', function($scope, $http, $location) {
  $scope.login = function() {
    console.log($scope.email);
    $http.post("login", {username: $scope.email, password: $scope.password}).then(function (response) {
      console.log(response.data);
      $location.path(response.data.redirect);
      // window.location.href = response.data.redirect;
    }, function (response) {
      console.log(response.data);
    });
  }


  $scope.register = function() {
    var data = {username: $scope.email, password: $scope.password};
    $http.post("register", data).then(function (response) {
      window.location.href = response.data.redirect;
    }, function (response) {
      console.log('error: %s', response.data);
    });
  }
});



springInitiative.controller('mainController', function($scope, $http){

		$http.get('api/allStudents')
			.success(function(data){
				$scope.allStudents = data;
                $scope.showStudent = false;
			})
			.error(function(data){
				console.log('Error:' + data)
			})

    $scope.getStudent=function(student){
    	$http.get('api/student/'+ student._id)
    		.success(function(data){
    			$scope.currentStudent = data.currentStudent;
                $scope.allStudents = data.allStudents;
                $scope.showStudent = !$scope.showStudent;

    		})
    		.error(function(data){
    			console.log('Error: ' + data)
    		})
      };


    $scope.addStudent=function(){
    	$http.post('api/student/add', $scope.newStudent)
    		.success(function(data){
    			$scope.allStudents = data.allStudents;
                $scope.newStudent = data.newStudent;
                console.log($scope.newStudent);
    		})
    		.error(function(data){
    			console.log('Error: ' + data)
    		})
    };

    $scope.editStudentFunc=function(student){
    	$http.post('api/student/edit/' + student._id, student)
    		.success(function(data){
                $scope.selected = $scope.allStudents[0];
                $scope.allStudents = data;
    		})
    		.error(function(data){
    			console.log('Error: ' + data)
    		})
    };


    $scope.newEntryFunc = function(student){
    	$http.post('api/student/newEntry/' + student._id, $scope.newEntry)
    		.success(function(data){
    			$scope.allStudents = data.allStudents;
                $scope.currentStudent = data.currentStudent;
    		})
    		.error(function(data){
    			console.log('Error: ' + data)
    		})
    };

	$scope.getArchive = function(){
		$http.get('api/index/archive')
			.success(function(data){
				$scope.allArchivedStudents = data
			})
			.error(function(data){
				console.log('Error:' + data)
			})
	};

});
