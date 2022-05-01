document.querySelector('#game-form').addEventListener('submit', checkGuess);
document.addEventListener('DOMContentLoaded', ready);
document.getElementById('game').addEventListener('mousedown', function (e) {
    console.log(e);
    if (e.target.className === 'reset-btn') {
        console.log('reset clicked');
        window.location.reload();
    }
});
let min = 1,
    max = 10
guessCounter = 0;
// swap values if min > max
if (min > max) {
    let tmpMax = max;
    tmpMin = min;
    max = tmpMin;
    min = tmpMax
}
const winningNumber = parseInt(Math.random() * max + 1);
const minNumber = document.getElementById('min-num');
const maxNumber = document.getElementById('max-num');
const guessDiv = document.getElementById('guesses');
const guessList = document.getElementById('guess-list');
const userInput = document.getElementById('input-number');
const guessCounterSpan = document.getElementById('guessCounter');
const maxGuesses = document.getElementById('maxGuesses');

function ready(e) {
    minNumber.innerText = min;
    maxNumber.innerText = max;
    userInput.max = max;
    userInput.min = min;
    userInput.value = 0;
    maxGuesses.innerText = 1;
    guessCounterSpan.innerText = guessCounter
}

function addListElement(guess) {
    const newLi = document.createElement('li');
    newLi.appendChild(document.createTextNode(guess));
    guessList.appendChild(newLi);
    guessCounterSpan.innerText++;
}

function reset(e) {
    location.reload()
    e.preventDefault()
}

function reset() {
    const resetButton = document.createElement('input');
    resetButton.classList = 'reset-btn';
    resetButton.type = 'submit';
    resetButton.value = 'Reset';
    resetButton.addEventListener('submit', reset);
    guessList.appendChild(resetButton);

}

function checkGuess(e) {
    console.log('clicked');
    let currentGuess = userInput.value;

    if (currentGuess == winningNumber) {
        document.body.style.backgroundColor = ' #66ff66';
        console.log('You win!');
        reset();
    }
    if (parseInt(guessCounterSpan.innerText) < parseInt(maxGuesses.innerText)) {
        console.log('not correct. try again');
        addListElement(currentGuess);
        userInput.value = 0;
    } else {
        document.body.style.backgroundColor = '#ff6666';
        console.log('You loose');
        reset();
    }
    e.preventDefault();
}