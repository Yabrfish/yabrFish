/**=========================================================
 * Module: myMarketController
 * Description: Controller for market panel in Profile page.
 * Author: Ryan - 2016-03-18
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.profile-market', ['ngAnimate', 'ui.bootstrap'])
        .directive('marketPanel', function() {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    viewerId: '='
                },
                controller: 'myMarketController',
                templateUrl: 'app/views/partials/market-panel.html'
            };
        })
        .controller('myMarketController', myMarketController)
        .directive('marketItem', function() {
            return {
                require: '^marketPanel',
                restrict: 'E',
                transclude: true,
                scope: {
                    market: '='
                },
                link: function(scope, element, attrs, myMarketController) {
                },
                templateUrl: 'app/views/partials/market-item.html'
            };
        });

    function myMarketController($rootScope, $scope, TileService, $timeout) {
        $scope.myMarket = [];
        $scope.loading = false;
        $scope.bMarketScrollDisabled = false;
        $scope.marketsWidth = 0;

        var setMarketsWidth = function(markets){
            $timeout(function(){
                var marketWidth = angular.element('.panel-item').width();
                $scope.marketsWidth = markets.length * marketWidth + 'px';
            })
        }        

        $scope.getMarketPlaces = function () {

            console.log("Get Market Place Called " + $scope.myMarket.length + "Loading " + $scope.loading + "Scroll " + $scope.bMarketScrollDisabled)

            if ($scope.loading) {
                return;
            }

            $scope.loading = true;

            if(!$scope.viewerId)
                $scope.viewerId = $rootScope.user.externalId;

            $scope.$watch("viewerId", function(newVal){

                
            })
        }
    }
})();