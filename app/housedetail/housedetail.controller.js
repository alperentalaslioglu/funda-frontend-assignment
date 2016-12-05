(function () {
    'use strict';

    angular.module('houseDetail').controller('HouseDetailController', HouseDetailController);

    function HouseDetailController(HouseDetailService) {

        var vm = this;
        vm.detail = {};
        vm.images = [];
        vm.description = '';
        vm.houseCoordinates = {};
        vm.mapOptions = {};
        vm.map = {};
        vm.handleImages = handleImages;
        vm.handleDescription = handleDescription;
        vm.handleCoordinates = handleCoordinates;
        vm.addMarker = addMarker;


        /*
         It is the constructor function that init everything
         */
        HouseDetailService.get(function (detail) {
            vm.detail = detail;
            vm.images = vm.handleImages(detail);
            vm.description = vm.handleDescription(detail);
            vm.houseCoordinates = handleCoordinates(detail);
            vm.mapOptions = {zoom: 12, center: vm.houseCoordinates, scrollwheel: false};
            vm.map = new google.maps.Map(document.getElementById('map'), vm.mapOptions);
            vm.addMarker(vm.houseCoordinates);
            console.log(vm.detail);
        });


        /*
         Preparing the images into suitable object array form.
         */
        function handleImages(detail) {
            var images = [];

            detail.Media.forEach(function (img) {

                var itemLink = img.MediaItems.filter(function (item) {
                    return item.Category === 7;
                });

                if (itemLink.length > 0) {
                    images.push({src: itemLink[0].Url});
                }
            });

            return images;
        }

        /*
         When render text into {{}} in view, it does not trust it as a valid html text
         Therefore the text is splitted into new lines array and easily rendered.
         */
        function handleDescription(detail) {
            return detail.VolledigeOmschrijving.split('\n');
        }

        function handleCoordinates(detail) {
            return new google.maps.LatLng(detail.WGS84_Y, detail.WGS84_X);
        }

        function addMarker(coordinate) {
            var marker = new google.maps.Marker({
                position: coordinate,
                map: vm.map,
                icon: "img/marker.png",
                animation: google.maps.Animation.BOUNCE
            });
        }
    }

})();
