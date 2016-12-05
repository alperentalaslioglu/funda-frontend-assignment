(function () {
    'use strict';

    angular.module('houseDetail').factory('HouseDetailService', HouseDetailService);


    /*
        My queries to Funda API is blocked by CORS policy
        Therefore, I saved data into a json and calling this json file from data/data.json
     */
    function HouseDetailService($resource) {
        const API_KEY = '005e7c1d6f6c4f9bacac16760286e3cd';
        const ID = '6289a7bb-a1a8-40d5-bed1-bff3a5f62ee6';
        const URL = 'http://partnerapi.funda.nl/feeds/Aanbod.svc/json/detail/:apiKey/koop/:id/';
        return $resource('data/data.json');
    }

})();