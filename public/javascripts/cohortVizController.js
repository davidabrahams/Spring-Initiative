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
    $scope.starOptions = {
          chart: {
              type: 'multiBarChart',
              height: 450,
              margin : {
                top: 20,
                right: 20,
                bottom: 45,
                left: 45
              },
              clipEdge: true,
              duration: 500,
              stacked: true,
              xAxis: {
                axisLabel: 'Date',
                showMaxMin: false,
                tickFormat: function(d){
                  return d3.time.format('%x')(new Date(d))
                }
              },
              yAxis: {
                axisLabel: '# Students',
                axisLabelDistance: -20,
                tickFormat: function(d){
                  return d3.format(',.1f')(d);
                }
              }
          }
      }; 
    //creating a list in format for viz
    //[[num, num], [num, num]] where first num corresponds to date and second is value
    var starData = [];
    for (var i = 0; i < $scope.stars.length; i++) {
      starData.push({x: Number(new Date($scope.dates[i])), y: $scope.stars[i]});
    }
    //sort star data into 3 lists depending on y value - of dictionaries
    var starData0 = [];
    var starData1 = [];
    var starData2 = [];

    starData.reduce(function(prev, currentData){
      if(currentData.y === 2){
        starData2.push(currentData);
      } else if(currentData.y === 1){
        starData1.push(currentData);
      } else if (currentData.y === 0){
        starData0.push(currentData);
      }
    })


    $scope.starData = generateData();

    function generateData() {
          var values = [];
          var values0 =[];
          var values1 = [];
          //change number of bars here by editing '90'//
          for (var h=0; h<90; h++) {
            //replace the y values with your own values//
            values.push({x: h, y: Math.random()+1});
            values0.push({x: h, y: Math.sqrt(h)/2});
            values1.push({x: h, y: Math.abs(h-18)})
          }
              console.log(values, values1, values0)


        return [{
          key: 'Sent',
          color: '#bcbd22',
          values: values
          },
          {
            key: 'Received',
            color: '#1f77b4',
            values: values0
          },
          {
            key: 'Spam',
            color: 'black',
            values: values1
          }
        ];
      }


    //y needs to change values based on the number of students - not the star
    // setting this new datalist to angular var for plotting
    // $scope.starData = [{
    //       key: '0 Stars',
    //       color: '#bcbd22',
    //       values: sumStarData0
    //       },
    //       {
    //         key: '1 Star',
    //         color: '#1f77b4',
    //         values: sumStarData1
    //       },
    //       {
    //         key: '2 Stars',
    //         color: 'black',
    //         values: sumStarData2
    //       }
    //     ];

  }, function errorCallback(response) {
    console.log('Error: ' + response.data);
  })
};
