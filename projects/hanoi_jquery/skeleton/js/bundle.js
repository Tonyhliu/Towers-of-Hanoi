/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiGame = __webpack_require__(1);
	const HanoiView = __webpack_require__(2)
	
	$( () => {
	  const rootEl = $('.toh');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	function Game () {
	  this.towers = [[3, 2, 1], [], []];
	};
	
	Game.prototype.isValidMove = function(startTowerIdx, endTowerIdx) {
	    const startTower = this.towers[startTowerIdx];
	    const endTower = this.towers[endTowerIdx];
	
	    if (startTower.length === 0) {
	      return false;
	    } else if (endTower.length == 0) {
	      return true;
	    } else {
	      const topStartDisc = startTower[startTower.length - 1];
	      const topEndDisc = endTower[endTower.length - 1];
	      return topStartDisc < topEndDisc;
	    }
	};
	
	Game.prototype.isWon = function(){
	    // move all the discs to the last or second tower
	    return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	};
	
	
	Game.prototype.move = function(startTowerIdx, endTowerIdx) {
	    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	      return true;
	    } else {
	      return false;
	    }
	};
	
	
	Game.prototype.print = function(){
	    console.log(JSON.stringify(this.towers));
	};
	
	
	Game.prototype.promptMove = function(reader, callback) {
	    this.print();
	    reader.question("Enter a starting tower: ", start => {
	      const startTowerIdx = parseInt(start);
	      reader.question("Enter an ending tower: ", end => {
	        const endTowerIdx = parseInt(end);
	        callback(startTowerIdx, endTowerIdx)
	      });
	    });
	};
	
	Game.prototype.run = function(reader, gameCompletionCallback) {
	    this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	      if (!this.move(startTowerIdx, endTowerIdx)) {
	        console.log("Invalid move!");
	      }
	
	      if (!this.isWon()) {
	        // Continue to play!
	        this.run(reader, gameCompletionCallback);
	      } else {
	        this.print();
	        console.log("You win!");
	        gameCompletionCallback();
	      }
	    });
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function HanoiView(game, el) {
	  this.$el = el;
	  this.game = game;
	
	  this.clickTowerIndex = null;
	  this.$el.on("click", "ul", this.clickTower.bind(this));
	
	  this.setupTowers();
	  this.render();
	}
	
	HanoiView.prototype.setupTowers = function(){
	  this.$el.empty();
	  this.$el.addClass("group");
	
	  let $tower, $disk;
	  for (let i = 0; i < 3; i++){
	    $tower = $("<ul>");
	    for (let j = 0; j < 3; j++){
	      $disk = $("<li>");
	      $tower.append($disk);
	    }
	
	    this.$el.append($tower);
	  }
	};
	
	HanoiView.prototype.render = function() {
	  const $towers = this.$el.find("ul");
	  $towers.removeClass();
	
	  if (this.clickTowerIndex !== null) {
	    $towers.eq(this.clickTowerIdx).addClass("selected");
	  }
	
	  // disks [1, 2, 3]
	  // towerIdx = 0;
	  this.game.towers.forEach( (disks, towerIdx) => {
	    const $disks = $towers.eq(towerIdx).children();
	    $disks.removeClass();
	
	    disks.forEach( (diskWidth, diskIdx) => {
	    /*
	    Since our disks are stacked from bottom to top
	    as [3, 2, 1], we have to select from the back
	    of our jQuery object, using negative indices.
	    */
	    $disks.eq(-1 * (diskIdx + 1)).addClass("disk-" + diskWidth);
	  });
	});
	
	
	  //click --> makes move
	    //disk moves, addClass to li, with disk index
	      //update the size of disk from css
	  // did they win?
	    // repeats @ click
	    //otherwise
	    //figcaption set up
	
	};
	
	HanoiView.prototype.clickTower = function (event) {
	  let index = $(event.currentTarget).index();
	
	  if (this.clickTowerIndex === null) {
	    this.clickTowerIndex = index;
	  } else if (!(this.game.move(this.clickTowerIndex, index))) {
	    alert("Invalid move!");
	    this.clickTowerIndex = null;
	  } else {
	    this.game.move(this.clickTowerIndex, index);
	    this.clickTowerIndex = null;
	  }
	
	  this.render();
	
	  if (this.game.isWon()) {
	    this.$el.off("click")
	    this.$el.addClass("game-over");
	    alert("Good work!");
	  }
	};
	
	module.exports = HanoiView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map