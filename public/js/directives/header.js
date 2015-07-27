'use strict';
angular.module('nodejsscafold')
    .directive('navBar', function() {
        return {
            restrict: 'AE',
            templateUrl: 'public/templates/directive/header.html',
            controller:'loginCtrl'
        };
    })

