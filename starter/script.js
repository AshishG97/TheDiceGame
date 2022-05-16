'use strict';

// Selecting Elements
// const palyerOneScore = document.querySelector("#score--0");  // Both are the same
const palyerOneScore = document.getElementById("score--0");
const palyerTwoScore = document.querySelector("#score--1");
const dice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");
const currentScoreOne = document.getElementById("current--0");
const currentScoreTwo = document.getElementById("current--1");
const playerOne = document.querySelector(".player--0");
const playerTwo = document.querySelector(".player--1");




// Initial Condition


let playing;
let scores;
let currentScore;
let activePlayer;

const initial = function () {
    dice.classList.add("hidden");
    playing = true;
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    palyerOneScore.textContent = 0;
    palyerTwoScore.textContent = 0;
    currentScoreOne.textContent = 0;
    currentScoreTwo.textContent = 0;
    playerOne.classList.remove("player--winner");
    playerTwo.classList.remove("player--winner");
    playerOne.classList.add("player--active");
    playerTwo.classList.remove("player--active");
};

initial();


const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;   //if active player is 1 the 1 or inverse.
    playerOne.classList.toggle("player--active");   // If one the color is pink then changes that to white and vice-vaersa
    playerTwo.classList.toggle("player--active");
}


// Rolling the Dice 
btnRoll.addEventListener("click", function () {
    if (playing) {
        // 1. Generating a random dice roll
        const roll = Math.trunc(Math.random() * 6) + 1;

        // 2. Display the Dice
        dice.classList.remove("hidden");
        dice.src = `dice-${roll}.png`;

        // Check for Rolled 1 --> if(true) {switch to next player};  else {roll again};
        if (roll !== 1) {
            currentScore += roll;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            // currentScoreOne.textContent = currentScore;
        }
        else {
            switchPlayer();
        }
    }
});


btnHold.addEventListener("click", function () {
    if (playing) {
        // add score to current_players score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // Check if score is >= 100

        if (scores[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        }
        else {
            switchPlayer();
        }
    }


    // switxh to next Player

});

btnNew.addEventListener("click", initial);
