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
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// Soundcloud Client Id: 8d709b750624924561c9e60f8b478795
	// client secret: acd66bfac20b68bf3bc521d3298fbc06
	
	window.addEventListener("load", function() {
	  var MP3Player = __webpack_require__(1);
	  var Path = __webpack_require__(5);
	
	  var audio = new Audio();
	  audio.src = "around_you.mp3";
	  audio.controls = true;
	  audio.loop = true;
	  audio.autoplay = true;
	
	  var context = new window.AudioContext();
	  var analyzer = context.createAnalyser();
	
	  var canvas = document.getElementById('game');
	  canvas.width = 300;
	  canvas.height = 300;
	  var ctx = canvas.getContext('2d');
	
	  var source = context.createMediaElementSource(audio);
	  source.connect(analyzer);
	  analyzer.connect(context.destination);
	  MP3Player.initMusicPlayer(audio, analyzer);
	
	  var frameLooper = function() {
	    window.requestAnimationFrame(frameLooper);
	    var fbcArray = new window.Uint8Array(analyzer.frequencyBinCount);
	    analyzer.getByteFrequencyData(fbcArray);
	
	    Path.render(fbcArray, canvas, ctx);
	  };
	
	  frameLooper();
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
	  initMusicPlayer: function (audio, analyzer) {
	    document.getElementById('audio_box').appendChild(audio);
	  },
	};


/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	module.exports = {
	  BARS: 100,
	  FILL_STYLE: '#00CCFF',
	
	  offset: 0,
	
	  clearPath: function (canvas, ctx) {
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	  },
	
	  render: function (fbcArray, canvas, ctx) {
	    this.clearPath(canvas, ctx);
	    ctx.fillStyle = this.FILL_STYLE;
	
	    for (var i = 0; i < this.BARS; i++) {
	      var barYPosition = ((i+this.offset)%this.BARS) * 3;
	      var barWidth = (fbcArray[i]/2);
	      var barHeight = 3;
	
	  		// ctx.fillRect(barXPosition, canvas.height, barWidth, barHeight);
	      ctx.fillRect(0, barYPosition, barWidth-10, barHeight);
	      ctx.fillRect(canvas.width, barYPosition, -(canvas.width-barWidth-(canvas.width/2)+10), barHeight);
	  	}
	
	    this.offset = (this.offset + 1)%this.BARS;
	  },
	};


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map