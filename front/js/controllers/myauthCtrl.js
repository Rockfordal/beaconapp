var app = angular.module('innercore').controller('MyAuthCtrl',
  function($scope, $firebaseAuth, Data) {
  var ref = new Firebase('https://innercore.firebaseio.com');
  var auth = $firebaseAuth(ref);

  // login with Facebook
  auth.$authWithOAuthPopup("facebook").then(function(authData) {
      console.log("Logged in as:", authData.facebook.displayName);
      console.log(authData);
    var photoUrl = 'http://graph.facebook.com/';
    var photoOpt = '/picture?width=18&height=18';
    $scope.data = Data;
    $scope.data.currentuser = authData.facebook.displayName;
    $scope.userphoto = photoUrl + authData.facebook.id + photoOpt;
    $scope.loginObj = authData;
    //$scope.$apply();
  }).catch(function(error) {
    console.log("Authentication failed:", error);
  });
});
