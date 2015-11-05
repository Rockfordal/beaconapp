var app = angular.module('innercore').controller('unitCtrl', function BeaconCtrl($scope, $firebase, Data) {
  var URL = 'https://innercore.firebaseio.com';
  var ref = new Firebase(URL);
  var unitref = ref.child('unit');
  var unitsync = $firebase(unitref);
  $scope.units = unitsync.$asObject();
});