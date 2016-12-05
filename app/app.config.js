(function () {
    'use strict';

    angular.module('fundaApp').config(AppConfig);

    function AppConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('house', {
                url: '/',
                templateUrl: 'views/house.html',
            });

        $urlRouterProvider.otherwise('/');
    }

})();
