(function () {
    'use strict';

    /**
     * @desc This is a directive to present multi images in a slider with animated transitions
     * @example <image-slider images="imageList"></image-slider>
     * @author Alperen
     */


    angular.module('houseDetail').directive('imageSlider', imageSlider);

    function imageSlider($timeout) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                images: '='
            },
            link: function (scope, el, attr) {

                $timeout(function () {

                    scope.currentIndex = 0;

                    scope.next = function () {
                        scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
                    };

                    scope.$watch('currentIndex', function () {
                        scope.images.forEach(function (image) {
                            image.visible = false;
                        });
                        scope.images[scope.currentIndex].visible = true;
                    });


                    // Infinite looping to animate forever
                    var loop;

                    var slideImages = function () {
                        loop = $timeout(function () {
                            scope.next();
                            loop = $timeout(slideImages, 3500);
                        });
                    };

                    slideImages();

                    // Removal of infinite loop
                    scope.$on('$destroy', function () {
                        $timeout.cancel(loop);
                    });
                    
                }, 100);

            },
            templateUrl: 'views/image-slider.directive.template.html'
        };
    }
})();
