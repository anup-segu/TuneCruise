// Soundcloud Client Id: 8d709b750624924561c9e60f8b478795
// client secret: acd66bfac20b68bf3bc521d3298fbc06

var SC = require('soundcloud');
var soundManager = require('soundManager2');

window.addEventListener("load", function() {
  var MP3Player = require("./mp3_player.js");
  var audio = new Audio();

  audio.src = "around_you.mp3";
  audio.controls = true;
  audio.loop = true;
  audio.autoplay = true;

  var context = new window.AudioContext();
  var analyzer = context.createAnalyser();

  var canvas = document.getElementById('game');
  canvas.width = 500;
  canvas.hegith = 30;
  var ctx = canvas.getContext('2d');

  var source = context.createMediaElementSource(audio);
  source.connect(analyzer);
  analyzer.connect(context.destination);
  MP3Player.initMusicPlayer(audio, analyzer);

  var frameLooper = function() {
    window.requestAnimationFrame(frameLooper);
    var fbcArray = new window.Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteFrequencyData(fbcArray);
    console.log(fbcArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  	ctx.fillStyle = '#00CCFF'; // Color of the bars
  	var bars = 100;
  	for (var i = 0; i < bars; i++) {
  		var barXPosition = i * 3;
  		var barWidth = 2;
  		var barHeight = -(fbcArray[i] / 2);
  		//  fillRect( x, y, width, height ) // Explanation of the parameters below
  		ctx.fillRect(barXPosition, canvas.height, barWidth, barHeight);
  	}
  };

  frameLooper();
});
