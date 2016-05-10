// Soundcloud Client Id: 8d709b750624924561c9e60f8b478795
// client secret: acd66bfac20b68bf3bc521d3298fbc06

// Audio_files
// 1. XESSIV - Around You - ./audio_files/around_you.mp3
// 2. stefan - Take Control - ./audio_files/take_control.mp3
// 3. RAWD - The Fire - ./audio_files/the_fire.mp3
// 4. Azeailia Banks - Chasing Time - ./audio_files/chasing_time.wav
// 5. Young Franco & Feki - Don't Stop - ./audio_files/dont_stop.mp3


var $ = require("jquery");
var MP3Player = require("./utils/mp3_player.js");
var Path = require("./path.js");
var Ship = require("./components/ship.js");
var Orb = require("./components/orb.js");

var GameControls = require("./utils/game_controls.js");
var Score = require("./utils/score.js");

window.addEventListener("load", function() {

  // Set up audio
  var audio = new Audio();
  audio.src = "./audio_files/dont_stop.mp3";
  audio.controls = true;
  audio.loop = true;
  audio.autoplay = true;

  var context = new window.AudioContext();
  var analyzer = context.createAnalyser();

  // Set up canvas for game
  var canvas = document.getElementById('game');
  canvas.width = $(window).width()*.8;
  canvas.height = $(window).height()*.8;
  var ctx = canvas.getContext('2d');

  // Set up Audio analyzer
  var source = context.createMediaElementSource(audio);
  source.connect(analyzer);
  analyzer.connect(context.destination);
  MP3Player.initMusicPlayer(audio, analyzer);

  // Set up game components
  var ship = new Ship(canvas, ctx);
  var score = new Score();
  var orb = new Orb(canvas, ctx, Path.BARS, score);
  new GameControls(ship, score, Path).start();

  var updateStats = function() {
    $("#score").html("Score: " + score.current());
    $("#combo").html("Combo: " + score.currentCombo() + "x");
    $("#boost-message").html(score.getBoostMessage());
  };

  var frameLooper = function() {
    // Render game based on browser refresh rate
    window.requestAnimationFrame(frameLooper);
    var fbcArray = new window.Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteFrequencyData(fbcArray);

    var baseArray = fbcArray.slice(0, 25);

    if (audio.duration > 0 && !audio.paused) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ship.render();
      Path.render(fbcArray, canvas, ctx);
      orb.render(Path.middleFromPos(orb.yPos), baseArray, Path.oscillationDir);

      if (Path.checkShipInPath(ship.xPos, ship.yPos)) {
        score.increment();
      } else if (!audio.paused) {
        score.reset();
        ship.reset(Path.bottomMiddle());
      }

      if (orb.touchingShip(
            ship.xPos,
            ship.yPos,
            ship.shipHeight,
            ship.shipWidth)) {
        orb.reset(Path.middle(0));
        score.addOrb();
      }

      // $("#score").html("Score: " + score.current());
      updateStats();
    }

  };


  frameLooper();

});
