var app = angular.module('innercore',
  ['firebase', 'ngRoute', 'toaster', 'ui.bootstrap']);

app.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/main.html'
      }).
      when('/beacon', {
        templateUrl: 'views/beacon.html',
        controller: 'BeaconCtrl'
      }).
      when('/unit', {
        templateUrl: 'views/unit.html',
        controller: 'unitCtrl'
      }).
      when('/castle', {
        templateUrl: 'views/castle.html',
        controller: 'castleCtrl'
      }).
      when('/user', {
        templateUrl: 'views/user.html',
        controller: 'userCtrl'
      }).
      otherwise({
        redirectTo: '/beacon'
      });
  }]);

app.factory('Data', function () {
  return { message: "I'm data from a service" }
});

//  app.run(['$rootScope', 'Data', function ($rootScope, Data) {
//    console.log('rootscope run');
//    $rootScope.$on("$firebaseAuth:login", function(e, user) {
//      console.log("User successfully logged in!");
//      //$scope.apply();
//    });
//  }]);

app.controller('navCtrl', ['$scope', '$location',
  function ($scope, $location) {
    $scope.isActive = function (path) {
      return ($location.path() == path)
    }
}]);
