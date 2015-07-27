'use strict';

angular.module('nodejsscafold')
    .controller('profileCtrl', function($scope, $stateParams, profile) {

        function init() {

            profile.getcustomer($stateParams.id).then(function(data) {
                $scope.CustomerDetails = data.result[0];

            });
        }

        init();
    });
