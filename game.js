
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function () {
    if(!started) {
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColor = this.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    level++;
    $("h1").text("Level " + level);

    playSound(randomChosenColor);
    $("#"+ randomChosenColor).animate({opacity: 0}, 200, function () {
        $("#"+ randomChosenColor).css("opacity", "1");
    });
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


function playSound(name) {
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}