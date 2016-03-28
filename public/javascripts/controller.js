var springInitiative = angular.module('springInitiative', ['ngRoute']);

// springInitiative.config(function($routeProvider){
// 	$routeProvider
// 	.when('/', {
// 		templateURL: '../views/student.html'
// 		controller: 'mainController'
// 	})
// });

springInitiative.config(function($routeProvider) {
    $routeProvider
    .when('/student',{
        templateUrl: '../views/student.html',
        controller: 'mainController'
    })
});



springInitiative.controller('mainController', function($scope, $http){

	$scope.getIndex = function(){
		$http.get('api/index')
			.success(function(data){
				$scope.allStudents = data
			})
			.error(function(data){
				console.log('Error:' + data)
			})
	};

    $scope.getStudent=function(student){
    	$http.get('api/student/'+ student)
    		.success(function(data){
    			$scope.currentStudent = data
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

    $scope.editStudent=function(student){
    	$http.post('api/student/edit/' + student)
    		.success(function(data){
    			$scope.currentStudent = data
    		})
    		.error(function(data){
    			console.log('Error: ' + data)
    		})
    };


    $scope.newEntry=function(student){
    	$http.post('api/student/newEntry/' + student)
    		.success(function(data){
    			$scope.currentStudent = data
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