(function(){
	'use strict';
	angular
		.module('memoryGameAPP')
		.factory('storageService', ['$rootScope', function($rootScope) {
	    return {
	        get: function(key) {
	            return localStorage.getItem(key);
	        },
	        set: function(key, data) {
	            localStorage.setItem(key, data);
	        }
	    };
	}]);
})();