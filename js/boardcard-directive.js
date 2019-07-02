(function(){
	'use strict';
	angular
		.module('memoryGameAPP')
		.directive('boardcard', boardcard);
	function boardcard(){
		return {
	        restrict: 'EA',
	        scope: { memorygame: '=' },
	        templateUrl: '../carddetails.html'
    	};	
	};
})();