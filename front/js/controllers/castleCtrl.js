var app = angular.module('innercore').
  controller('castleCtrl', function($scope, $firebase, $filter, Data, toaster) {
    var URL = 'https://innercore.firebaseio.com';
    var ref = new Firebase(URL);
    var castleref = ref.child('castle')
    var castlesync = $firebase(castleref);
    $scope.castles = castlesync.$asArray();
    $scope.data = Data;
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    //$scope.filteredCastles = $scope.castles;
    // toaster.pop('error', 'title', 'test');

    $scope.setdate = function () {
      var datetoday = moment().format('YYYY-MM-DD');
      $scope.new = { Date: datetoday };
      //toastr.success('Updated date');
    };

    $scope.updatedate = function () {
      var datetoday = moment().format('YYYY-MM-DD');
      $scope.new.Date = datetoday;
    };

    $scope.save = function () {
      if ($scope.new.$id) {
        toaster.pop('info', 'title', 'Updated ' + $scope.new.Name);
        $scope.castles.$save();
        //toastr.success('Saved ' + $scope.new.Name);
        console.log('saved ' + $scope.new.Name + ' ' + $scope.new.$id);
      } else {
        // TODO: dublettkoll
        $scope.castles.$add($scope.new);
        toastr.success('Added ' + $scope.new.Name);
      }
      $scope.clearnew();
    };

    $scope.clearnew = function () {
      toaster.pop('error', 'title', 'test');
      $scope.setdate();
    };

    $scope.remove = function (castle) {
      castlesync.$remove(castle.$idid);
      toastr.warning('Removed ' + castle.Name);
    };

    $scope.castles.$loaded().then(function () {
      $scope.totalItems = $scope.castles.length;
      $scope.$watch('currentPage + itemsPerPage', function() {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
            end = begin + $scope.itemsPerPage;
        var castles = $filter('filter')($scope.castles, $scope.searchText);
//        console.log('begin: ' + begin + ' end: ' + end);
        $scope.filteredCastles = castles; //.slice(begin, end);

      });
    });

//    $scope.numPages = function () {
//      return Math.ceil($scope.castles.length / $scope.itemsPerPage);
//    };

    $scope.sel = function (castle) {
      if (castle) {
        $scope.new = castle;
        // toastr.error('Selected ' + castle);
        console.log('selected ' + castle)
      }
    };

    $scope.info = function () {
      console.log($scope.new.$id);
    }

    $scope.clearnew();
  });
