// Soundcloud Client Id: 8d709b750624924561c9e60f8b478795
// client secret: acd66bfac20b68bf3bc521d3298fbc06

window.addEventListener("load", function() {
  var MP3Player = require("./mp3_player.js");
  var Path = require("./path.js");

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
