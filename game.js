var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function handler() {
  var userChosenColour = $(this).attr("id");

  $("#" + userChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  setTimeout(function() {
    $("#" + userChosenColour).removeClass("pressed");
  }, 100);

  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
}

$(".btn").click(handler);

function playSound(randomChosenColour) {
  var sound;

  switch (randomChosenColour) {
    case "red":
      sound = new Audio("sounds/red.mp3");
      break;

    case "blue":
      sound = new Audio("sounds/blue.mp3");
      break;

    case "green":
      sound = new Audio("sounds/green.mp3");
      break;

    case "yellow":
      sound = new Audio("sounds/yellow.mp3");
      break;
  }

  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
}

$(document).keydown(function() {
  if(started === false) {
    started = true;
    $("h1").text("Level 0");
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  var ok = true;
  for(var i = 0; i <= currentLevel; i++) {
    if(userClickedPattern[i] !== gamePattern[i]) {
      ok = false;
      break;
    }
  }

  if(ok === true) {
    if(currentLevel === gamePattern.length - 1) {
      setTimeout(function() {nextSequence();}, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();

  $("h1").text("Game Over, Press Any Key To Restart");
  started = false;
  level = 0;
  gamePattern = [];

  $("body").addClass("game-over");
  setTimeout(function() {$("body").removeClass("game-over");}, 200);
}
