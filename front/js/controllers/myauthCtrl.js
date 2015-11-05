var app = angular.module('innercore').controller('MyAuthCtrl', ['$scope', '$firebaseSimpleLogin', '$firebase', 'Data',
  function($scope, $firebaseSimpleLogin, $firebase, Data) {
    var ref = new Firebase('https://innercore.firebaseio.com');
    var photoUrl = 'http://graph.facebook.com/';
    var photoOpt = '/picture?width=18&height=18';
    $scope.usergotid = false;
    $scope.data = Data;

//    $scope.loginObj = $firebaseSimpleLogin(ref);
//    $scope.loginObj.$login('facebook', { scope: 'public_profile'}).then(function(user) {
//      if (user) {
//        $scope.data.currentuser = user.displayName;
//        $scope.userphoto = photoUrl + user.id + photoOpt;
//      };
//    }, function(error) {
//      console.error('Login failed: ', error);
//    });

    var auth = new FirebaseSimpleLogin(ref, function(error, user) {
      if (error) {
        console.log('Authentication error: ', error);
      } else if (user) {
        console.log('User ' + user.id + ' authenticated via the ' + user.provider + ' provider!');
        $scope.data.currentuser = user.displayName;
        $scope.userphoto = photoUrl + user.id + photoOpt;
        $scope.loginObj = {};
        $scope.loginObj.user = user;
        $scope.$apply();
      } else {
        console.log("User is logged out.")
      }
    });

//    $scope.loginFacebook = function () {
      auth.login('facebook', { scope: 'public_profile' });
//    }

  }
]);