var d3Controller = function($scope, $http, $state) {
  $http.get('/api/student/data/' + $scope.currentStudent._id).then(function successCallback(
    response) {
    $scope.attendance = response.data.attendanceList;
    $scope.dates = response.data.datesList;
    $scope.stars = response.data.starsList;

    var count = {};
    // creating a dictionary mapping elements to their counts in a list
    // http://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript
    $scope.attendance.forEach(function(i) {
      count[i] = (count[i] || 0) + 1;
    });

    var dataList = [];
    var keys = Object.keys(count);

    for (var i = 0; i < keys.length; i++) {
      console.log(count)
      dataList.push({
        key: keys[i],
        y: count[keys[i]]
      })
    }
    $scope.options = {
      chart: {
        type: 'pieChart',
        height: 500,
        x: function(d) { return d.key; },
        y: function(d) { return d.y; },
        showLabels: true,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: { margin: { top: 5, right: 35, bottom: 5, left: 0 } }
      }
    };
    $scope.data = dataList;
  }, function errorCallback(response) {
    console.log('Error: ' + response.data);
  })
}
