// Very nice work on the d3 vizualizations

//Controller to show and create vizs based on data on a specific student
var d3Controller = function($scope, $http, $state) {

  $scope.timeFrame = "-1";

  // These are all the fields for which viz is available
  $scope.canBeVisualized = ['attendance', 'stars', 'warnings', 'engageContent', 'engagePeer', 'engageAdult', 'Write-Up', 'Detention', 'In-School Suspension', 'Out-of-School Suspension'];
  // what will be displayed in the dropdown
  $scope.canBeVisualizedDisplay = ['Attendance', 'Stars', 'Warnings', 'Content Engagement', 'Peer Engagement', 'Adult Engagement', 'Write-Up', 'Detention', 'In-School Suspension', 'Out-of-School Suspension'];
  // This is a dictionary mapping from field name to values in the database
  $scope.dataLists = {};
  // This is a dictionary mapping from field name to type in the database
  $scope.dataListsTypes = {};
  $scope.dates = [];
  // Initialize the first dictionary
  $scope.canBeVisualized.forEach(function(category) {
    $scope.dataLists[category] = [];
  });

  $scope.typeToViz = {"string": ["Pie"], "boolean": ["Pie", "Bar"], "number": ["Pie", "Bar", "Line"]};

  //creating a dictionary mapping elements to their counts in a list
  //http://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript
  //finding the keys for each item in the object just created
  //to be used in the data set up for the viz
  //creating the necessary data set up for the viz
  //[{key:, y:},{},{}], where key is "Absent" and "y" is the # of times

  var formatPieData = function(data){
    var newList = [];
    var dataDict = {};
    if (data !== undefined) {
      data.forEach(function(i) {
        if (i !== undefined && i === i) {
          dataDict[i] = (dataDict[i] || 0) + 1;
        }
      });
      var keys = Object.keys(dataDict);
      for (var i = 0; i < keys.length; i++) {
        newList.push({
          key: keys[i],
          y: dataDict[keys[i]]
        });
      }
    }
    return newList;
  };

  var formatLineData = function(data, dates) {
    var contentData = [];
    var res = [];
    if (data !== undefined) {
      for (var j = 0; j < data.length; j++) {
        // This deals with NaN
        if (data[j] !== undefined && data[j] === data[j]) {
          contentData.push({x:Number(new Date(dates[j])), y: data[j]});
        }
      }

      contentData.sort(function(a, b) {
        return parseFloat(a.x) - parseFloat(b.x);
      });

      res = [{
        values: contentData,      //values - represents the array of {x,y} data points
        // key: 'engageContent', //key  - the name of the series.
        color: '#ff7f0e',  //color - optional: choose your own line color.
        strokeWidth: 2,
        classed: 'dashed'
      }];
    }
    return res;
  };

  var formatBarData = function(data, dates) {
    // creating a list in format for viz
    // [[num, num], [num, num]] where first num corresponds to date and second is value
    var contentData = [];
    var res = [];
    if (data !== undefined) {
      for (var i = 0; i < data.length; i++) {
        if (data[i] !== undefined && data[i] === data[i]) {
          contentData.push([Number(new Date(dates[i])), data[i]]);
        }
      }
      contentData.sort(function(a, b) {
        return parseFloat(a[0]) - parseFloat(b[0]);
      });

      contentData.sort(function(a, b) {
        return parseFloat(a[0]) - parseFloat(b[0]);
      });

      if (contentData.length > 0)
      {
        var newIterator = new Date(contentData[0][0]);
        var lastDate = new Date(contentData[contentData.length - 1][0]);
        var year1 = newIterator.getFullYear();
        var month1 = newIterator.getMonth();
        var day1 = newIterator.getDate();
        var year2 = lastDate.getFullYear();
        var month2 = lastDate.getMonth();
        var day2 = lastDate.getDate();
        while (!(year1 == year2 && month1 == month2 && day1 == day2)) {
          var foundMatch = false;
          contentData.forEach(function(pair){
            var tempDate = new Date(pair[0]);
            var year3 = tempDate.getFullYear();
            var month3 = tempDate.getMonth();
            var day3 = tempDate.getDate();
            if (year1 == year3 && month1 == month3 && day1 == day3) {
              foundMatch = true;
            }
          });
          if (!foundMatch) {
            contentData.push([Number(newIterator), null]);
          }
          newIterator = new Date(newIterator);
          newIterator.setDate(newIterator.getDate() + 1);
          year1 = newIterator.getFullYear();
          month1 = newIterator.getMonth();
          day1 = newIterator.getDate();
        }
      }

      contentData.sort(function(a, b) {
        return parseFloat(a[0]) - parseFloat(b[0]);
      });


      //setting this new datalist to angular var for plotting
      res = [{
        "key": "Quantity",
        "bar": true,
        "values": contentData
      }];
    }
    return res;
  };

  var filterOutDates = function(arr, dates, days) {
    var newArray = [];
    var newDates = [];
    var thresh = new Date();
    thresh.setDate(thresh.getDate() - days);
    if (arr !== undefined) {
      for (var i = 0; i < arr.length; i++) {
        if (new Date(dates[i]) >= thresh || days === -1) {
          newArray.push(arr[i]);
          newDates.push(dates[i]);
        }
      }
    }
    return [newArray, newDates];
  };

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

  $scope.lineOptions = {
    chart: {
      type: 'lineChart',
      height: 450,
      margin: {
        top: 20,
        right: 20,
        bottom: 40,
        left: 55
      },
      forceY: [0, 5],
      x: function(d) { return d.x; },
      y: function(d) { return d.y; },
      useInteractiveGuideline: true,
      dispatch: {
        stateChange: function(e) {
          console.log("stateChange");
        },
        changeState: function(e) {
          console.log("changeState");
        },
        tooltipShow: function(e) {
          console.log("tooltipShow");
        },
        tooltipHide: function(e) {
          console.log("tooltipHide");
        }
      },
      xAxis: {
        axisLabel: 'Date',
        tickFormat: function(d) {
          return d3.time.format('%x')(new Date(d));
        },
        axisLabelDistance: -10
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

  var setBarOptions = function() {
    //options to create time based bar chart
    $scope.barOptions = {
      chart: {
        type: 'historicalBarChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 65,
          left: 50
        },
        color:['#ff7f0e'],
        forceY: [0, 2.5],
        x: function(d) {
          return d[0];
        },
        y: function(d) {
          return d[1];
        },
        showValues: true,
        valueFormat: function(d) {
          return d3.format(',.1f')(d);
        },
        duration: 100,
        xAxis: {
          axisLabel: 'Dates',
          tickFormat: function(d) {
            return d3.time.format('%x')(new Date(d));
          },
          rotateLabels: 30,
          showMaxMin: false
        },
        yAxis: {
          axisLabel: $scope.canBeVisualizedDisplay[$scope.canBeVisualized.indexOf($scope.chosenData)],
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
  };

  var updateData = function() {
    var filteredData = filterOutDates($scope.dataLists[$scope.chosenData], $scope.dates, Number($scope.timeFrame));
    $scope.pieData = formatPieData(filteredData[0]);
    $scope.lineData = formatLineData(filteredData[0], filteredData[1]);
    $scope.barData = formatBarData(filteredData[0], filteredData[1]);
    setBarOptions();
  };

  $scope.$watchGroup(["chosenData", "chartType", "timeFrame"], function(newValues, oldValues) {
    updateData();
  });

  $http.get('/api/student/dataList/' + $scope.currentStudent._id).then(function successCallback(
    response) {

    // iterate over the forms in the DB
    response.data.forEach(function(entry) {
      $scope.dates.push(entry.date);
      // put school behavior in the current dictionary
      for (var key in entry['schoolBehavior']) {
        if (entry['schoolBehavior'].hasOwnProperty(key)) {
          entry[key] = entry['schoolBehavior'][key]
        }
      }
      // iterate over the viz fields
      $scope.canBeVisualized.forEach(function(category) {
        // append to the corresponding list
        $scope.dataLists[category].push(entry[category]);
        // this is some fancy code that will ensure that dataListsTypes will
        // contain the correct types after looping
        if ($scope.dataListsTypes[category] === undefined &&
            entry[category] !== undefined) {
          $scope.dataListsTypes[category] = typeof entry[category];
        }
      });
    });
  }, function errorCallback(response) {
    console.log('Error: ' + response.data);
  });
};
