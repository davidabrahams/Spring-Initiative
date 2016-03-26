springInitiative = angular.module('springInitiative', ['ngMaterial', 'ngRoute']);
springInitiative.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateURL: 'html/student.html'
		controller: 'mainController'
	})
});


springInitiative.controller('mainController', function($scope, $http

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
    	$http.get('api/student/add')
    		.success(function(data){
    			$scope.newStudent = data
    		})
    		.error(function(data){
    			console.log('Error: ' + data)
    		})
    };

    $scope.editStudent=function(student){
    	$http.get('api/student/edit/' + student)
    		.success(function(data){
    			$scope.currentStudent = data
    		})
    		.error(function(data){
    			console.log('Error: ' + data)
    		})
    };


    $scope.newEntry=function(student){
    	$http.get('api/student/newEntry/' + student)
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