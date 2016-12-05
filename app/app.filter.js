(function () {
    'use strict';

    angular.module('fundaApp').filter("dateFilter", function ($filter) {
        return function (item) {
            if (item != null) {
                var parsedDate = new Date(parseInt(item.substr(6)));
                return $filter('date')(parsedDate, 'yyyy-MM-dd');
            }
            return "";
        };
    });


})();
