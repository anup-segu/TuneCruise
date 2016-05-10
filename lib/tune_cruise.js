// Soundcloud Client Id: 8d709b750624924561c9e60f8b478795
// client secret: acd66bfac20b68bf3bc521d3298fbc06

//audio_files
// 1. XESSIV - Around You - ./audio_files/around_you.mp3
// 2. stefan - Take Control - ./audio_files/take_control.mp3
// 3. RAWD - The Fire - ./audio_files/the_fire.mp3
// 4. Azeailia Banks - Chasing Time - ./audio_files/chasing_time.wav


var $ = require("jquery");
var Ship = require("./components/ship.js");
var GameControls = require("./utils/game_controls.js");
var MP3Player = require("./utils/mp3_player.js");
var Path = require("./path.js");
var Score = require("./utils/score.js");

window.addEventListener("load", function() {
  var audio = new Audio();
  audio.src = "./audio_files/chasing_time.wav";
  audio.controls = true;
  audio.loop = true;
  audio.autoplay = true;

  var context = new window.AudioContext();
  var analyzer = context.createAnalyser();

  var canvas = document.getElementById('game');
  canvas.width = $(window).width()*.8;
  canvas.height = $(window).height()*.8;
  var ctx = canvas.getContext('2d');

  var source = context.createMediaElementSource(audio);
  source.connect(analyzer);
  analyzer.connect(context.destination);
  MP3Player.initMusicPlayer(audio, analyzer);

  var ship = new Ship(canvas, ctx);
  var score = new Score();
  new GameControls(ship).start();

  var frameLooper = function() {
    window.requestAnimationFrame(frameLooper);
    var fbcArray = new window.Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteFrequencyData(fbcArray);

    if (audio.duration > 0 && !audio.paused) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ship.render();
      Path.render(fbcArray, canvas, ctx);

      if (Path.checkShipInPath(ship.xPos, ship.yPos)) {
        score.increment();
      } else if (!audio.paused) {
        score.reset();
        ship.reset(Path.bottomMiddle());
      }

      $("#score").html("Score: " + score.current());
    }
    
  };


  frameLooper();

});
