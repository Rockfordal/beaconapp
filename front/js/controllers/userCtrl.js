var app = angular.module('innercore').controller('userCtrl', function UserCtrl($scope, $firebaseObject) {
  var URL = 'https://innercore.firebaseio.com';
  var ref = new Firebase(URL);
  var userref = ref.child('users');
  $scope.users = $firebaseObject(userref);
  $scope.newuser = { name: '', id: '' };

  $scope.add = function () {
    var newuser = {
      name: $scope.newuser.name
    };
    userref.child($scope.newuser.id).set(newuser, function () {
      $scope.newuser.name = '';
      $scope.newuser.id = '';
      toastr.success('Added ' + $scope.newuser.name);
    });
  };

  $scope.remove = function (id, user) {
    usersync.$remove(id);
    toastr.warning('Removed ' + user.name);
  };

});
