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
        })
      } 
      return newList
    }

    var attendanceList = [];
    $scope.attendanceData = formatPieData($scope.attendance, attendanceList)

    var warningsList = [];
    $scope.warningData = formatPieData($scope.warnings, warningsList)

    //options to create pie chart
    $scope.pieOptions = {
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
    // //setting attendance data for plotting to angular var
    // $scope.attendanceData = attendanceDataList;

    //options to create time based chart
    $scope.histOptions = {
      chart: {
        type: 'historicalBarChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 65,
          left: 50
        },
        x: function(d) {
          return d[0];
        },
        y: function(d) {
          return d[1]
        },
        showValues: true,
        valueFormat: function(d) {
          return d3.format(',.1f')(d);
        },
        duration: 100,
        xAxis: {
          axisLabel: 'Dates',
          tickFormat: function(d) {
            return d3.time.format('%x')(new Date(d))
          },
          rotateLabels: 30,
          showMaxMin: false
        },
        yAxis: {
          axisLabel: 'Stars Achived',
          axisLabelDistance: -10,
          tickFormat: function(d) {
            return d3.format(',.1f')(d);
          }
        },
        tooltip: {
          keyFormatter: function(d) {
            return d3.time.format('%x')(new Date(d));
          }
        },
        zoom: {
          enabled: true,
          scaleExtent: [1, 10],
          useFixedDomain: false,
          useNiceScale: false,
          horizontalOff: false,
          verticalOff: true,
          unzoomEventType: 'dblclick.zoom'
        }
      }
    };
      
    //creating a list in format for viz
    //[[num, num], [num, num]] where first num corresponds to date and second is value
    var dateData = [];
    for (var i = 0; i < $scope.stars.length; i++) {
      dateData.push([Number(new Date($scope.dates[i])), $scope.stars[i]]);
    }


    //setting this new datalist to angular var for plotting
    $scope.histData = [{
      "key": "Quantity",
      "bar": true,
      "values": dateData
    }];
  }, function errorCallback(response) {
    console.log('Error: ' + response.data);
  })
};
