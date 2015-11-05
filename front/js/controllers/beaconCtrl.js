var app = angular.module('innercore').controller('BeaconCtrl',
  function BeaconCtrl($scope, $firebase, Data) {

  var rootUrl = 'https://innercore.firebaseio.com/beacon';
  $scope.data = Data;
  $scope.calculate = calculate;
  $scope.addbeacon = addbeacon;
  $scope.changebeacon = changebeacon;
  $scope.beacons = [

    { id: 0, name: 'Test Beacon' },

    //IC2
    { id: 1987, name: 'ic2 #1987 (x:-2697; y: 3203)' },
    { id: 2251, name: 'ic2 #2251 (x: 2097; y: 3403)' },
    { id: 2388, name: 'ic2 #2388 (x:-1997; y: 3503)' },
    { id: 1077, name: 'ic2 #1077 (x:-1397; y:-2297)' },
    { id: 1172, name: 'ic2 #1172 (x:-1497; y:-2397)' },

    //IC3
    { id: 2925, name: 'ic3 #2925 (x:-3497; y:-3797)' },
    { id: 1863, name: 'ic3 #1863 (x:-2597; y: 3103)' },
    { id: 1988, name: 'ic3 #1988 (x:-2497; y: 3203)' },
    { id:  963, name: 'ic3 #963  (x: 2203; y:-1097)' },

    //IC4
    { id: 1583, name: 'ic4 #1583 (x:-97;  y:-2797)' },
    { id: 1584, name: 'ic4 #1584 (x:-297; y:-2797)' },

    //IC5
    { id: 679,  name: 'ic5 #679  (x:-1797; y:  703)' },
    { id: 2241, name: 'ic5 #2241 (x:-3297; y: 2603)' },
    { id: 2110, name: 'ic5 #2110 (x:-997;  y: -897)' },
    { id: 2378, name: 'ic5 #2378 (x:-3397; y:2903)' },

    //IC7
    { id: 829,  name: 'ic7 #829  (x:-1997; y: -297)' },
    { id: 1000, name: 'ic7 #1000 (x:-2197; y: -297)' },
    { id: 2908, name: 'ic7 #2908 (x:  -97; y:-3797)' },

    //IC
    { id: 1743, name: 'ic #1743 (x: -2497; y: 3003)' },
    { id: 1864, name: 'ic #1864 (x: -2397; y: 3103)' },
    { id: 1742, name: 'ic #1742 (x: -2697; y: 3003)' },
    { id: 1626, name: 'ic #1626 (x: -2597; y: 2903)' },
    { id: 1513, name: 'ic #1513 (x: -2697; y: 2803)' },
    { id: 1625, name: 'ic #1625 (x: -2797; y: 2903)' },
    { id: 1624, name: 'ic #1624 (x: -2797; y: 2703)' }

    //Old
    // { id: 333,  name: 'ic2 #333  (x: 1303; y:  -197)' },
    // { id: 3222, name: 'ic2 #3222 (x: -297; y: -3997)' },
    // { id: 3852, name: 'ic2 #3852 (x: 4403; y:  -297)' }
  ];
  $scope.currentbeacon = $scope.beacons[0].id;

  var firsttime = true;
  var obj;

  function addbeacon() {
//    var newid = window.prompt('number #');
//    var x = window.prompt('x coordinate');
//    var y = window.prompt('y coordinate');
    toastr.error('Sorry, not implemented yet');
  };

  function updateinfo() {
      var time = moment().format('');
      var user = $("#userlogin").text().trim();
      $scope.beacon.updated_at = time;
      $scope.beacon.updated_by = user;
    }

  function changebeacon() {
    if (!firsttime) {
      $scope.unbind();
    }

    var URL = rootUrl + '/' + $scope.currentbeacon;
    var ref = new Firebase(URL);
    obj = $firebase(ref).$asObject();

    // 3-way data binding
    obj.$bindTo($scope, 'beacon').then(function(unbind) {
      toastr.info('loaded beacon ' + $scope.currentbeacon);
      $scope.unbind = unbind;
      $scope.calculate();
      watchbeacon();
    });

    firsttime = false;
  };
  $scope.changebeacon();

 //console.log(moment().format());

  function watchbeacon() {
//    if ($scope.beacon != undefined) {
//        $scope.beacon.$on('loaded', function() {
//          $scope.calculate();
//        })

    obj.$watch(function () {
      updateinfo();
      $scope.calculate();
    });
//    };
    }

  function calcTime() {
    var d = new Date();
    var n = d.getTime();
    var past = moment($scope.beacon.updated_at);
    var present = moment(n);
    var now = moment(); //.format();
    $scope.updated_at = past.from(now);
    $scope.updated_by = $scope.beacon.updated_by;
    //console.log('calctime: past=', past, ' present=' , present);
  }

  function calculate() {
    calcTime();
    var levels = $scope.beacon.levels;
    var troops = $scope.beacon.troops;

    //Bonuses
    var infantrybonus = (100 + levels.infantry*2) / 100;
    var infantrybonus = infantrybonus * ( 1 + levels.relic.infantry/100);
    var cavalrybonus = (100 + levels.cavalry*2) / 100;
    var cavalrybonus = cavalrybonus * ( 1 + levels.relic.cavalry/100);
    var occultbonus = (100 + levels.occult*2) / 100;
    var occultbonus = occultbonus * ( 1 + levels.relic.occult/100);
    var beastiarybonus = (100 + levels.beastiary*2) / 100;
    var beastiarybonus = beastiarybonus * ( 1 + levels.relic.beastiary/100);

    // Legends
    var iceguardianS = 11000;
    var archangelS = 11000;
    var hydraS = 7800;
    var elephantS = 3514;
    var naithiS = 4694;
    var observerS = 40.6;

    $scope.iceguardianD = iceguardianS * troops.iceguardians / 1000 / 1000;
    $scope.archangelD = archangelS * troops.archangels / 1000 / 1000;
    $scope.hydraD = hydraS * troops.hydras / 1000 / 1000;
    $scope.elephantD = elephantS * troops.elephants / 1000 / 1000;
    $scope.naithiD = naithiS * troops.naithis / 1000 / 1000;
    $scope.observerD = observerS * troops.observers / 1000 / 1000;

    // Infantry
    var archstrength = 19;
    var archnum = troops.archers + troops.imparchers + troops.darkarchers;
    var archD = archstrength * archnum / 1000;

    var dwarfstrength = 22;
    var dwarfnum = troops.dwarfs + troops.impdwarfs + troops.darkdwarfs;
    var dwarfD = dwarfstrength * dwarfnum / 1000;

    var arbaS = 30;
    var arbaN = troops.arbas + troops.imparbas + troops.darkarbas;
    var arbaD = arbaS * arbaN / 1000;

    var wardenS = 60;
    var wardenN = troops.wardens + troops.impwardens + troops.darkwardens;
    var wardenD = wardenS * wardenN / 1000;

    var ballistaS = 60;
    var ballistaN = troops.ballistas + troops.impballistas + troops.darkballistas;
    var ballistaD = ballistaS * ballistaN / 1000;

    var beerS = 30;
    var beerN = troops.beers + troops.impbeers + troops.darkbeers;
    var beerD = beerS * beerN / 1000;

    var huntressS = 30;
    var huntressN = troops.huntress + troops.imphuntress + troops.darkhuntress;
    var huntressD = huntressS * huntressN / 1000;

    var lostoneS = 30;
    var lostoneN = troops.lostones + troops.implostones;
    var lostoneD = lostoneS * lostoneN / 1000;

    // Cavalry
    var nomadS = 150;
    var nomadN = troops.nomads + troops.impnomads + troops.darknomads;
    var nomadD = nomadS * nomadN / 1000;

    var barbS = 150;
    var ebarbS = 160;
    var barbN = troops.barbs + troops.impbarbs + troops.darkbarbs
    var barbD = barbS * barbN / 1000;
    var ebarbD = ebarbS * troops.eldritchbarbs / 1000;

    var reiterS = 150;
    var reiterN = troops.reiters + troops.impreiters
    var reiterD = reiterS * reiterN / 1000;

    // Occult
    var golemS = 400;
    var golemN = (troops.golems||0) + troops.impgolems + troops.darkgolems + troops.eldritchgolems;
    var golemD = golemS * golemN / 1000;

    var demonS = 415;
    var demonN = troops.demons + troops.impdemons + troops.darkdemons;
    var demonD = demonS * demonN / 1000;

    // Beastiary
    var silentS = 29;
    var silentN = troops.silentones + troops.impsilentones + troops.darksilentones;
    var silentD = silentS * silentN / 1000;

    var succuS = 43;
    var succuN = troops.succubus + troops.impsuccubus + troops.darksuccubus;
    var succuD = succuS * succuN / 1000;

    var undeaddragonS = 881;
    var undeaddragonN = troops.undeaddragon;
    var undeaddragonD = undeaddragonS * undeaddragonN / 1000;

    var impundeaddragonS = 881;
    var impundeaddragonN = troops.impundeaddragon;
    var impundeaddragonD = impundeaddragonS * impundeaddragonN / 1000;

    var darkundeaddragonS = 925.5;
    var darkundeaddragonN = (troops.darkundeaddragon || 0);
    var darkundeaddragonD = darkundeaddragonS * darkundeaddragonN / 1000;

    var assassinS = 29.5;
    var assassinN = (troops.assassin||0);
    var assassinD = assassinS * assassinN / 1000;

    var impassassinS = 29.5;
    var impassassinN = (troops.assassin||0);
    var impassassinD = impassassinS * impassassinN / 1000;

    var griffinS = 587.5;
    var dgriffinS = 616.75;
    var egriffinS = 625;
    var griffinN = troops.griffins + troops.impgriffins;
    var griffinD = griffinS * griffinN / 1000;
    var dgriffinD = dgriffinS * troops.darkgriffins / 1000;
    var egriffinD = egriffinS * troops.eldritchgriffins / 1000;

    $scope.kmod = ''
    if (troops.archers > 9999) $scope.kmod = '+'

    var infantrytot = troops.archers + troops.imparchers + troops.darkarchers +
      troops.dwarfs + troops.impdwarfs + troops.darkdwarfs + troops.wraiths +
      troops.arbas + troops.imparbas + troops.darkarbas +
      troops.beers + troops.impbeers + troops.darkbeers +
      troops.wardens + troops.impwardens + troops.darkwardens +
      troops.ballistas + troops.impballistas + troops.darkballistas +
      troops.huntress + troops.imphuntress + troops.darkhuntress +
      troops.lostones + troops.implostones;
    var beastytot = troops.griffins + troops.impgriffins + troops.darkgriffins + troops.eldritchgriffins +
                    troops.undeaddragon + troops.darkundeaddragon +
                    troops.silentones + troops.impsilentones + troops.darksilentones;
    var cavalrytot = troops.nomads + troops.impnomads + troops.darknomads +
                     troops.barbs + troops.impbarbs + troops.darkbarbs + troops.eldritchbarbs +
                     troops.reiters + troops.impreiters;
    var occulttot = troops.golems + troops.impgolems + troops.darkgolems + troops.eldritchgolems +
                    troops.demons + troops.impdemons + troops.darkdemons;
    var legendtot = troops.iceguardians + troops.archangels + troops.hydras + troops.elephants + troops.naithis + troops.observers;
    var totalunits = infantrytot + cavalrytot + occulttot + beastytot + legendtot;
    $scope.totalunits = totalunits / 1000;
    var baseinfantrydef = archD+dwarfD+beerD+arbaD+wardenD+ballistaD+huntressD+lostoneD;
    $scope.infantrydef = baseinfantrydef * infantrybonus / 1000;
    var basecavalrydef = nomadD+barbD+ebarbD+reiterD;
    $scope.cavalrydef = basecavalrydef * cavalrybonus / 1000;
    var baseoccultdef = golemD+demonD;
    $scope.occultdef = baseoccultdef * occultbonus / 1000;
    var basebeastiarydef = silentD+griffinD+dgriffinD+egriffinD+succuD+undeaddragonD+impundeaddragonD+darkundeaddragonD+assassinD+impassassinD;
    $scope.beastiarydef = basebeastiarydef * beastiarybonus / 1000;
    $scope.legendarydef = $scope.iceguardianD + $scope.archangelD + $scope.hydraD + $scope.elephantD + $scope.naithiD + $scope.observerD;
//    var relicInf = levels.relic.infantrydef || 0;
//    var relicCav = levels.relic.cavalrydef || 0;
//    var relicOcc = levels.relic.occultdef || 0;
//    var relicBea = levels.relic.beastiarydef || 0;
//    var relicP =  (relicInf+relicCav+relicOcc+relicBea/4);
    var beaconL = levels.beacon || 0;
    var beaconP = beaconL*5;
//    var relicM = 1 + relicP / 100;
    var beaconM = 1 + beaconP / 100;
    var alldef = $scope.infantrydef + $scope.cavalrydef + $scope.occultdef + $scope.beastiarydef + $scope.legendarydef;
    $scope.totaldef =  alldef;
    $scope.finaldef =  alldef * beaconM;
    $scope.beacondef = $scope.finaldef - $scope.totaldef;
    //$scope.apply();
  };

//    $scope.saveit = function () {
//      $scope.beacon.$save('levels');
//      $scope.beacon.$save('troops');
//      //$scope.data.setlast($/scope.data.currentuser);
//    }

//  $scope.beacon.$on('change', function() {
//    var curgentuser = $scope.data.currentuser;
//    var tiden = moment().format('dddd hh:mm:ss');
//    var msg = currentuser + " " + tiden;
////    if (currentuser && msg != $scope.lastmsg) {
////      $scope.chat.$update({lastupdate: msg});
////    }
//    //$scope.calculate();
//  });

  //$scope.data = Data
  //$scope.remoteItems.bar = "foo";
  // ref.child('troops').set({ archers: 15, });
});
