'use strict';

angular.module('nodejsscafold')
    .factory('profile', function($http, $q) {
    	return {
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

            }



    	}

    });


