var cohortVizController = function($scope, $http, $state) {

  $http.get('/api/cohort/data/' + $scope.currentCohortName).then(function successCallback(
    response) {
    $scope.timeFrame = "-1";
    $scope.attendance = response.data.attendanceList;
    $scope.dates = response.data.datesList;
    $scope.stars = response.data.starsList;
    $scope.warnings = response.data.warningList;
    $scope.engagePeer = response.data.engagePeerList;
    $scope.engageContent = response.data.engageContentList;
    $scope.engageAdult = response.data.engageAdultList;    

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

    var formatPieData = function(data){
    var newList = [];
    var dataDict = {};
    if (data !== undefined) {
      data.forEach(function(i) {
        if (i !== undefined && i === i || data !== null) {
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



    var allLists = {attendance:$scope.attendance, warnings:$scope.warnings, stars:$scope.stars, engageContent: $scope.engageContent, engagePeer:$scope.engagePeer, engageAdult:$scope.engageAdult};
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

    var updateData = function() {
      var filteredData = filterOutDates(allLists[$scope.chosenData], $scope.dates, Number($scope.timeFrame));
      $scope.pieData = formatPieData(filteredData[0]);
      console.log($scope.pieData)
    };

    updateData();

    $scope.$watchGroup(["timeFrame", "chosenData"], function(newValues, oldValues) {
      updateData();
    });


  }, function errorCallback(response) {
    console.log('Error: ' + response.data);
  });
};
