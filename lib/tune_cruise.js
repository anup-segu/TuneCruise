// Soundcloud Client Id: 8d709b750624924561c9e60f8b478795
// client secret: acd66bfac20b68bf3bc521d3298fbc06

// Audio_files
// 1. XESSIV - Around You - ./audio_files/around_you.mp3
// 2. stefan - Take Control - ./audio_files/take_control.mp3
// 3. RAWD - The Fire - ./audio_files/the_fire.mp3
// 4. Azeailia Banks - Chasing Time - ./audio_files/chasing_time.wav
// 5. Young Franco & Feki - Don't Stop - ./audio_files/dont_stop.mp3

var SC = window.SC;

var $ = require("jquery");
var MP3Player = require("./utils/mp3_player.js");
var Path = require("./components/path.js");
var Ship = require("./components/ship.js");
var Orb = require("./components/orb.js");

var GameControls = require("./utils/game_controls.js");
var Score = require("./utils/score.js");

window.addEventListener("load", function() {
  SC.initialize({
    client_id: '8d709b750624924561c9e60f8b478795'
  });

  // var track_url = 'https://soundcloud.com/deepsounds/thief-crazy-lost-kings-remix';
  // var track_url = 'https://soundcloud.com/deepsounds/kandy-titus-doubetter';
  // var track_url = 'https://soundcloud.com/deepsounds/instatic-burning-for-you';
  var track_url = 'https://soundcloud.com/brynnny/took-a-pill-in-ibiza-brynny-press-play-bootleg';

  // Set up audio

  var audio = new Audio();

  var soundCloudResolve = "http://api.soundcloud.com/resolve.json?url=";
  var CLIENT_ID = "8d709b750624924561c9e60f8b478795";


  //Make ajax request to Soundcloud api based on track url
  $.get(
    soundCloudResolve + track_url + '&client_id=' + CLIENT_ID,
    function (result) {
      console.log(result);
      audio.src = result.stream_url + '?client_id=' + CLIENT_ID;
      audio.crossOrigin = "anonymous";
      $(".game-background").css("background-image", "url("+ result.artwork_url +")");
    }
  );

  audio.controls = true;
  audio.loop = true;
  audio.autoplay = false;

  $(".start-button").click(function() {
    launch();
    $(".welcome-message").addClass("hide");
  });

  var launch = function() {
    $("#start-3").removeClass("hide");
    setTimeout(function() {
      $("#start-3").addClass("hide");
      $("#start-2").removeClass("hide");
    }, 1000);
    setTimeout(function() {
      $("#start-2").addClass("hide");
      $("#start-1").removeClass("hide");
    }, 2000);
    setTimeout(function() {
      $("#start-1").addClass("hide");
      $("#start-go").removeClass("hide");
    }, 3000);
    setTimeout(function() {
      $("#start-go").addClass("hide");
      MP3Player.initMusicPlayer(audio, analyzer);
      audio.play();
    }, 3250);
  };

  var context = new window.AudioContext();
  var analyzer = context.createAnalyser();

  // Set up canvas for game
  var canvas = document.getElementById('game');
  canvas.width = $(window).width()*.8;
  canvas.height = $(window).height()*.8;
  var ctx = canvas.getContext('2d');

  // Set up canvas for ship
  var shipCanvas = document.getElementById('game-ship');
  shipCanvas.width = $(window).width()*.8;
  shipCanvas.height = $(window).height()*.8;
  var shipCtx = shipCanvas.getContext('2d');

  // Set up canvas for orbs
  var orbCanvas = document.getElementById('game-orb');
  orbCanvas.width = $(window).width()*.8;
  orbCanvas.height = $(window).height()*.8;
  var orbCtx = orbCanvas.getContext('2d');

  // Set up Audio analyzer
  var source = context.createMediaElementSource(audio);
  source.connect(analyzer);
  analyzer.connect(context.destination);

  // Set up game components
  var ship = new Ship(shipCanvas, shipCtx);
  var score = new Score();
  var orb = new Orb(orbCanvas, orbCtx, Path.BARS, score);
  var orb2 = new Orb(orbCanvas, orbCtx, Path.BARS, score);
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
      shipCtx.clearRect(0, 0, shipCanvas.width, shipCanvas.height);
      orbCtx.clearRect(0, 0, orbCanvas.width, orbCanvas.height);

      // ship.render();
      Path.render(fbcArray, canvas, ctx);
      orb.render(
        Path.middleFromPos(orb.yPos),
        baseArray,
        Path.oscillationDir,
        Path.boosted
      );

      // Reset score and ship if ship touching path
      if (Path.checkShipInPath(ship.xPos, ship.yPos)) {
        score.increment();
      } else if (!audio.paused) {
        score.reset();
        ship.reset(Path.bottomMiddle());
      }

      // update score and reset orb if orb touching ship
      var touching = orb.touchingShip(
          ship.xPos,
          ship.yPos,
          ship.shipHeight,
          ship.shipWidth
      );

      if (touching) {
        orb.reset(Path.middle(0));
        score.addOrb();
        ship.isTouchingOrb();
      }

      ship.render(fbcArray);

      updateStats();
    }

  };


  frameLooper();

});
