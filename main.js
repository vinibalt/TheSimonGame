const gamePattern = [];
const userClickedPattern = [];
const buttonColors = ['red', 'blue', 'green', 'yellow']; 
let start = true;

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    $(`#${randomChosenColor}`).fadeOut(75).fadeIn(75);
    playSound(randomChosenColor)
     gamePattern.push(randomChosenColor);
    return randomChosenColor;
}

function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function colorClicked() {
    $("div.btn").click((e) => {
        let userChosenColor = e.target.id;
        $(`#${userChosenColor}`).addClass('pressed');
        setTimeout(() => {
            $(`#${userChosenColor}`).removeClass('pressed');
        }, 300)
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        return userChosenColor;
    })
}

function checkAnswer(currentLevel) {
    let indexOfUserP = userClickedPattern.lastIndexOf(0, userClickedPattern.length)
    if (currentLevel == userClickedPattern[indexOfUserP]){
        console.log('success')
    } else {
        console.log('wrong')
    }
}

// let rndcolor = setTimeout(() => {
//     nextSequence()
// }, 1000)

let clkColor = colorClicked();


$('body').keypress(nextSequence);

if (gamePattern.length > 0) {
    for(let i = 0; i < gamePattern.length; i++) {
        if (gamePattern[i] === userClickedPattern[i]) {
            nextSequence();
            console.log('to aquii')
        }
        
    }
}

