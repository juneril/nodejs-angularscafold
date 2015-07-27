'use strict';

angular.module('nodejsscafold')
    .factory('customers', function($http, $q) {
        var abouts = {};

        return {
            getAllCostumers: function(callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/1.0/customer')
                    .success(function(data) {
                        deferred.resolve(data);
                        return cb();
                    })
                    .error(function(err) {
                        deferred.reject(err);
                        return cb(err);
                    }.bind(this));

                return deferred.promise;
            },
            getDocumentsById: function(id,callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/1.0/document/'+ id)
                    .success(function(data) {
                        deferred.resolve(data);
                        return cb();
                    })
                    .error(function(err) {
                        deferred.reject(err);
                        return cb(err);
                    }.bind(this));

                return deferred.promise;
            },
            createCustomers: function(data, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.post('/api/1.0/customer', data)
                    .success(function(data) {
                        deferred.resolve(data);
                        return cb();
                    })
                    .error(function(err) {
                        deferred.reject(err);
                        return cb(err);
                    }.bind(this));

                return deferred.promise;
            },
            savecomment: function(data, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.post('/api/1.0/document/comments', data)
                    .success(function(data) {
                        deferred.resolve(data);
                        return cb();
                    })
                    .error(function(err) {
                        deferred.reject(err);
                        return cb(err);
                    }.bind(this));

                return deferred.promise;
            },
            getcustomer: function(id,callback){
                var cb = callback|| angular.noop;
                var deferred = $q.defer();

                $http.get('/api/1.0/customer/'+id)
                 .success(function(data) {
                        deferred.resolve(data);
                        return cb();
                    })
                    .error(function(err) {
                        deferred.reject(err);
                        return cb(err);
                    }.bind(this));

                return deferred.promise;

            },
            getcomment: function(id,callback){
                var cb = callback|| angular.noop;
                var deferred = $q.defer();

                $http.get('/api/1.0/document/comments/'+id)
                 .success(function(data) {
                        deferred.resolve(data);
                        return cb();
                    })
                    .error(function(err) {
                        deferred.reject(err);
                        return cb(err);
                    }.bind(this));

                return deferred.promise;
            },
            updateCustomer: function(id, data, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.put('/api/1.0/customer/' + id, data)
                    .success(function(data) {
                        deferred.resolve(data);
                        return cb();
                    })
                    .error(function(err) {
                        deferred.reject(err);
                        return cb(err);
                    }.bind(this));

                return deferred.promise;
            },
            deleteCostumerbyId: function(id, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.delete('/api/1.0/customer/' + id)
                    .success(function(data) {
                        deferred.resolve(data);
                        return cb();
                    })
                    .error(function(err) {
                        deferred.reject(err);
                        return cb(err);
                    }.bind(this));

                return deferred.promise;
            },
            login: function(data,callback){
                var cb= callback || angular.noop;
                var deferred =$q.defer();
                
            }

        };
    });
