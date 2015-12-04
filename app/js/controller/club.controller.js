/**=========================================================
 * clubController: Controller for a Profile Club Page
 * used in Profile Club page.
 * Author: Marcin - 2015-11-19
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.profile-clubs', ['ngAnimate', 'ui.bootstrap','flash', 'xeditable'])
        .run(function(editableOptions) {
          editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
        })
        .controller('clubController', clubController);

    function clubController($scope, $rootScope, $http, $modal, $log, Flash, APP_APIS) {
      if(!$rootScope.user)
        return;
      
      $scope.clubs = [];
      $scope.myClubs = [];
      $scope.search_club = '';

      // Search Clubs
      $scope.$watch('search_club', function(newVal){
        if(newVal != ''){
          $http.get(APP_APIS['commerce']+'/accounts?name='+newVal+'&type=6')
            .success(function(data){
              $scope.clubs = data;
            })          
        }else{
          $scope.clubs = [];
        }
      });

      $scope.addMember = function(aid) {
        $http.post(APP_APIS['commerce']+'/viewers/'+$rootScope.user.externalId+'/membership/'+aid)
          .success(function(data){
            $http.get(APP_APIS['commerce']+'/viewers/'+$rootScope.user.externalId+'/membership?type=6')
              .success(function(data){
                $scope.myClubs = data;
              });
            
            var message = "Successfully Added!";
            Flash.create('success', message);
          })
          .error(function(status, data){
            if (status.error == "Conflict") {
              var message = "This memeber already Added!";
              Flash.create('danger', message);
            };
          });
      }

      // Set Club Name in Search box.
      $scope.selectClub = function(aid, text){
        $scope.aid = aid;
        $scope.search_club = text;
      }

      // Get My Clubs
      $http.get(APP_APIS['commerce']+'/viewers/'+$rootScope.user.externalId+'/membership?type=6')
        .success(function(data){
          $scope.myClubs = data;
        });
    }
})();