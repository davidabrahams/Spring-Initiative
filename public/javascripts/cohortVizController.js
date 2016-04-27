var cohortVizController = function($scope, $http, $state) {

  $http.get('/api/cohort/data/' + $scope.currentCohortName).then(function successCallback(
    response) {

    $scope.attendance = response.data.attendanceList;
    $scope.dates = response.data.datesList;
    $scope.stars = response.data.starsList;
    $scope.warnings = response.data.warningList;

    //creating a dictionary mapping elements to their counts in a list
    //http://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript
    //finding the keys for each item in the object just created
    //to be used in the data set up for the viz
    //creating the necessary data set up for the viz
    //[{key:, y:},{},{}], where key is "Absent" and "y" is the # of times

    function formatPieData(data, newList){
      var dataDict = {};
      data.forEach(function(i) {
        dataDict[i] = (dataDict[i] || 0) + 1;
      });
      var keys = Object.keys(dataDict);
      for (var i = 0; i < keys.length; i++) {
        newList.push({
          key: keys[i],
          y: dataDict[keys[i]]
        });
      }
      return newList;
    }

    var attendanceList = [];
    $scope.attendanceData = formatPieData($scope.attendance, attendanceList);

    var warningsList = [];
    $scope.warningData = formatPieData($scope.warnings, warningsList);

    var starsList = [];
    $scope.starData = formatPieData($scope.stars, starsList);
    //options to create pie chart
    $scope.pieOptions = {
      chart: {
        type: 'pieChart',
        height: 500,
        x: function(d) { return d.key; },
        y: function(d) { return d.y; },
        showLabels: true,
        donut: true,
        donutRatio: 0.35,
        duration: 500,
        labelThreshold: 0.05,
        labelType: "percent",
        legend: { margin: { top: 5, right: 35, bottom: 5, left: 0 } }
      }
    };

  }, function errorCallback(response) {
    console.log('Error: ' + response.data);
  });
};
