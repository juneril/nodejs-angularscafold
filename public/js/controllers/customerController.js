'use strict';

angular.module('nodejsscafold')
    .controller('customerCtrl', function($anchorScroll, $location, $scope, $filter, $modal, toastr, customers, Upload, ngDialog, ngTableParams) {

        function init() {

            var docarr = [];
            $scope.comments = {};
            $scope.CustomerDetails = {};
         
            $scope.isUpdate = false;
            $scope.isDisable = true;
            $scope.files = {};
          
            $scope.TextCommet = {};
            $scope.tableParams = {};


            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10, // count per page
                sorting: {
                    name: 'asc' // initial sorting
                }
            }, {
                getData: function($defer, params) {
                    customers.getAllCostumers().then(function(res) {
                        var datas = res.result;
                        var orderedData = {};

                        if ($scope.search) {
                            orderedData = $filter('filter')(datas, $scope.search);
                            orderedData = params.sorting() ? $filter('orderBy')(orderedData, params.orderBy()) : orderedData;
                        } else {
                            orderedData = params.sorting() ? $filter('orderBy')(datas, params.orderBy()) : datas;
                        }

                        params.total(datas.length);
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    });
                }
            });


        }

        $scope.refresh = function() {
            $scope.tableParams.reload();
            $scope.search = "";
        };

        $scope.savecustomer = function() {
                customers.createCustomers($scope.newCostumer).then(function(data) {
                    toastr.success('Record Successfully Saved', 'Record Saved');
                    $scope.refresh();
                    $scope.cancel();
                });
            
        };
        
        $scope.addNew = function() {
            $scope.newDoc = {};
            $scope.isUpdate = false;
            $scope.isDisable = false;
        };

        $scope.cancel = function() {
            $scope.newDoc = {};
            $scope.isUpdate = false;
            $scope.isDisable = true;
        };

        $scope.comment = function(id) {
            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'public/templates/directive/comment.html',
                size: 'lg',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    documents.getcomment(id).then(function(data) {
                        $scope.comments = data.result;

                    })

                    $scope.postComment = function() {
                        var data = {};
                        data.id = id;
                        data.comment = $scope.TextCommet.comment;
                        console.log(data);
                        documents.savecomment(data).then(function(saveResp) {
                            documents.getcomment(id).then(function(data) {
                                $scope.TextCommet.comment = null;
                                $scope.comments = data.result;
                                var newHash = 'anchor' + saveResp.result;
                                if ($location.hash() !== newHash) {
                                    // set the $location.hash to `newHash` and
                                    // $anchorScroll will automatically scroll to it
                                    $location.hash('anchor' + saveResp.result);
                                } else {
                                    // call $anchorScroll() explicitly,
                                    // since $location.hash hasn't changed
                                    $anchorScroll();
                                }
                            })
                        });
                    };

                    $scope.closeModal = function() {
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });
        };


        $scope.delete = function(id) {
            ngDialog.openConfirm({
                templateUrl: 'public/templates/directive/deleteModal.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            }).then(function() {
                customers.deleteCostumerbyId(id).then(function() {
                    $scope.refresh();
                });

            });
        };


        $scope.searchclick = function() {
            $scope.tableParams.reload();
        };

        // $scope.$watch("search", function() {
        //     $scope.tableParams.reload();
        // });


        $scope.view = function(id) {
            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'public/templates/directive/view.html',
                controller: ['$scope', '$modalInstance', '$timeout', function($scope, $modalInstance, $timeout) {

                    $scope.progressPercentage = 0;
                    $scope.fileselection = {};
                    customers.getcustomer(id).then(function(data) {
                        $scope.CustomerDetails = data.result[0];
                    });

                    $scope.uploadFile = function(files) {
                        if (files && files.length) {
                            $scope.files = files;
                            console.log('$scope.files: ', $scope.files);
                            $scope.fileselection = 0;
                        } else {
                            $scope.fileselection = 1;
                        }
                    };

                    $scope.uploadStart = function() {

                        if ($scope.files && $scope.files.length) {
                            for (var i = 0; i < $scope.files.length; i++) {
                                var file = $scope.files[i];
                                Upload.upload({
                                    url: 'api/1.0/customer/upload',
                                    fields: {
                                        'ID': id
                                    },
                                    file: file
                                }).progress(function(evt) {
                                    $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                    customers.getcustomer(id).then(function(data) {
                                        $scope.CustomerDetails = data.result[0];
                                    });
                                    // console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.file.name);
                                }).success(function(data, status, headers, config) {
                                    // console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                                    // $timeout(function() {
                                    //     $modalInstance.dismiss('cancel');
                                    // }, 1000);
                                }).error(function(data, status, headers, config) {
                                    // console.log('error status: ' + status);
                                });
                            }
                        } else {
                            console.log('wala');
                        }
                    };
                    $scope.updatecustomer = function() {
                        console.log($scope.CustomerDetails);
                        customers.updateCustomer($scope.CustomerDetails.ID, $scope.CustomerDetails).then(function(data) {
                            toastr.success('Record Successfully Updated', 'Record Updated');
                            // $scope.refresh();
                            // $scope.cancel();
                        });
                        // customers.updateCustomer()

                    };

                    $scope.closeModal = function() {
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });
        };


        $scope.loginform = function(){
             var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'public/templates/directive/login.html',
                controller: ['$scope', '$modalInstance', '$timeout', function($scope, $modalInstance, $timeout) {
                  
                    $scope.login = function() {
                        customers.login($scope.credentials).then(function(data) {
                            toastr.success('Record Successfully Updated', 'Record Updated');
                           
                        });
                    };

                    $scope.closeModal = function() {
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });


        };


        init();
    });
