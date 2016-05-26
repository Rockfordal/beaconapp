var app = angular.module('innercore').controller('unitCtrl', function BeaconCtrl($scope, $firebaseObject, Data) {
  var URL = 'https://innercore.firebaseio.com/unit';
  var ref = new Firebase(URL);
  // var unitref = ref.child('unit');
  // $scope.units = $firebaseObject(unitref);
  $scope.units = $firebaseObject(ref);
  // var syncObject = $firebaseObject(ref);
  // syncObject.$bindTo($scope, "units");
});
