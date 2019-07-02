(function(){
	'use strict';
	angular
		.module('memoryGameAPP', [])
		.controller('memoryGameController', ['$scope','storageService', memoryGameController]);
		function memoryGameController($scope, storageService) {
			var vm = this;
			vm.addActive = false;
			vm.tiles = [];
			vm.countDiamonds = 0;
			vm.highestScore= 0;
			vm.showModal = false;
		    vm.settings = {
		        'playerName': '',
		        'size': 8,
		        'playerScore':0
		    };
		    vm.boardSize =[
						{text: 'Small (4x4)', value: 4},
						{text: 'Medium (6x6)', value: 6},
						{text: 'Large (8x8)', value: 8}
						];
			vm.initTiles = initTiles;
			vm.calculateScore = calculateScore;	
			initTiles();
			//initialize the board 
		    function initTiles(){
		    	var index = 0;
		    	vm.tiles = [];
		    	vm.highestScore= 0;
		    	vm.countDiamonds = 0;
		    	var isDiamond = false;
		    	vm.showModal = false;
		    	var boardSize = vm.settings.size;
		    	if(storageService.get("highestScore") === null){
		    		storageService.set("highestScore",vm.highestScore);	
		    	}
		    	vm.preHighScore = parseInt(storageService.get("highestScore"));
		    	vm.settings.playerScore = boardSize * boardSize;
		    	var tileArray = [];
			    for (var i=0;i<boardSize;i++){
			    	var tempArray=[];
			    	for(var j=0;j<boardSize;j++){
			    		var obj = {
			    			'index': index,
			    			'isOpened': false,
			    			'hasDiamond': isDiamond
			    		};
			    		index++;
			    		tempArray.push(obj);
			    	}
			    	vm.tiles.push(tempArray);
			    }
			    generateRandomDiamond(vm.tiles);
		    }
		    //generate unique random numbers inorder to place dimaonds randomly
		    function generateRandomDiamond(tempArray){
		    	var setRandomDiamond =[];
		    	var cnt = tempArray.length;
		    	var len = vm.settings.size;
		    	var numberCnt = 0;
		    	var lenRandom = setRandomDiamond.length;
		    	while(lenRandom < len){
		    		var rand = Math.floor(Math.random() * len * len);
		    		if( setRandomDiamond.indexOf(rand)< 0){
		    		  	setRandomDiamond.push(rand); 
		    		  	numberCnt++;
		    		}
		    		lenRandom = setRandomDiamond.length;
		    	};

		    	for (var i=0;i<cnt;i++){
			    	for(var j=0;j<cnt;j++){
			    		if(setRandomDiamond.indexOf(tempArray[i][j].index) >= 0)
			    		{
			    			tempArray[i][j].hasDiamond = true;
			    		}
			    	}
			    }	
			    vm.tiles= [];
			    vm.tiles = tempArray;    	
		    }
		     //mark card open when clicked
		    function calculateScore(el) {
		    	el.isOpened = true;
		    	if(el.hasDiamond == true){
		    		vm.countDiamonds++;
		    	}
		    	vm.settings.playerScore = vm.settings.playerScore - 1; 
		    	if(vm.countDiamonds == vm.settings.size && storageService.get("highestScore") !== null){
		    		if(vm.settings.playerScore > vm.preHighScore)
		    		{
		    			vm.preHighScore = vm.settings.playerScore;
		    			vm.highestScore = vm.settings.playerScore;
		    			storageService.set("highestScore", vm.highestScore);
		    		}
					var element = $('#gameModal');
					element.modal('show');
		    	}
		    }
		}
})();