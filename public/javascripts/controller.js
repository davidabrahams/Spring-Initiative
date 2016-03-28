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

		$http.get('api/index')
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


    $scope.newEntry=function(student){
    	$http.post('api/student/newEntry/' + student._id, student)
    		.success(function(data){
                $scope.selected = $scope.allStudents[0];
    			$scope.allStudents = data;
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