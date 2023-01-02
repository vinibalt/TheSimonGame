const gamePattern = [];
const buttonColors = ['red', 'blue', 'green', 'yellow'];
let userClickedPattern = [];
let start = false;
let level = 0;

function nextSequence() {
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $(`#${randomChosenColor}`).fadeOut(75).fadeIn(75);
    playSound(randomChosenColor);
    level++;
    $('#level-title').text(`Level ${level}`);
}

function playSound(name) {
    var sound = new Audio(`sounds/${name}.mp3`)
    sound.play();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass('pressed');
    setTimeout(() => {
        $(`#${currentColor}`).removeClass('pressed');
    }, 100)
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        $('#level-title').text('Game Over, Press Any Key to Restart')

        $('body').addClass('game-over')
        setTimeout(() => {
            $('body').removeClass('game-over')
        }, 200)

        startOver();
    }


}

function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
}

$('div.btn').click((e) => {
    let userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor)
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

$(document).keypress(() => {
    if (!start) {
        nextSequence();
        start = true;
    }
})