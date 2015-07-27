'use strict';

angular.module('nodejsscafold')
    .controller('loginCtrl', function( $location, $scope,  $modal, toastr) {

        function init() {

        }


        $scope.loginform = function(){

            console.log('login clicked');
             var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'public/templates/directive/login.html',
                controller: ['$scope', '$modalInstance', '$timeout', function($scope, $modalInstance, $timeout) {
                  
                    $scope.login = function() {
                        customers.login($scope.credentials).then(function(data) {
                            toastr.success('Record Successfully Updated', 'Record Updated');
                           
                        });
                    };

                    $scope.modalClose = function() {
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });


        };


        init();
    });
