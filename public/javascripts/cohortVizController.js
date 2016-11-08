//Controller to show and create vizs based on data across a specific cohort
var cohortVizController = function($scope, $http, $state) {

  $http.get('/api/cohort/data/' + $scope.currentCohortName).then(function successCallback(
    response) {
    $scope.timeFrame = "-1";
    // oh man, this is a bit late, but there are some really cool ways to do shit like this in es6/7/8, if you are interested look into object destructuring and spread
    // it would be $scope = {...$scope, ...response.data};
    // or Object.assign($scope, response.data);
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
      // this would have been a great place for a dates.filter()
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
    // no dicts in JS, objects have some important differences
    var dataDict = {};
    // probably not the clearest way to format this
    if (data !== undefined) {
      data.forEach(function(i) {
        if (i !== undefined && i === i && i!== null) {
          dataDict[i] = (dataDict[i] || 0) + 1;
        }
      });
      // would have probably gone with
      // return Object.keys.map(function (key){
      //    return {key:key, y:dataDict[key]}
      //})
      //or with new syntax
      // return Object.keys,map(key => ({key, y:dataDict[key]}))
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
    };

    updateData();

    $scope.$watchGroup(["timeFrame", "chosenData"], function(newValues, oldValues) {
      updateData();
    });


  }, function errorCallback(response) {
    console.log('Error: ' + response.data);
  });
};
