'use strict';
angular.module('nodejsscafold', [
        'angularUtils.directives.dirPagination', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'cgBusy',
        'ngFileUpload', 'angular-loading-bar', 'toastr', 'ngTable', 'ngDialog', 'validation', 'validation.rule',
        'angularMoment', 'ngPDFViewer'
    ])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'public/templates/index.html',
            })
            .state('customer', {
                url: '/home/customer',
                templateUrl: 'public/templates/customer.html',
                controller: 'customerCtrl'

            })
            .state('profile', {
                url: '/home/profile/:id',
                templateUrl: 'public/templates/profile.html',
                controller: 'profileCtrl'
            });

        $urlRouterProvider.otherwise('/home');

        $locationProvider.html5Mode(true);
    })
    .config(['ngDialogProvider', function(ngDialogProvider) {
        ngDialogProvider.setDefaults({
            className: 'ngdialog-theme-default',
            plain: false,
            showClose: false,
            closeByDocument: false,
            closeByEscape: true
        });
    }]);
    // .run(function($rootScope, $location, loginFactory){
    //     var routespermission=['/home/customer'];  //route that require login
    //     $rootScope.$on('$routeChangeStart', function(){
    //         if( routespermission.indexOf($location.path()) !=-1)
    //         {
    //             var connected=true;
    //             connected.then(function(msg){
    //                 if(!msg.data) $location.path('/home');
    //             });
    //         }
    //     });
   
