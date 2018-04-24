/*jshint esversion: 6 */
// game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;

// grab UI elements 
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play agin event listener 
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
});
// listen to guessBtn
guessBtn.addEventListener('click', function() {
    
    let guess = parseInt(guessInput.value);

    //validate the input 
    //make sure it's not minimum or maximum or even blank
    if(isNaN(guess) || guess > max || guess < min ) {

        setMessage(`please enter a number between ${min} and  ${max}`, 'red');
    }
    // check if win
    if(guess === winningNum) {
        //game over won
        gameOver(true, `${winningNum} is correct YOU WON!`);

    }else{
        //substract 1 from the guesses left guesses
        guessesLeft -= 1;

        //check if any guesse left
        if(guessesLeft === 0) {

            // game over lost
            gameOver(false, `YOU LOST! the winning number is ${winningNum}`);
   
        }else{
            // game continues

            //tell user it is the wrong number
            setMessage(`${guess} is not correct , ${guessesLeft} guesses left` , 'red');

            // make border red
            guessInput.style.borderColor = 'red';

            //clear the input

            guessInput.value = '';
            
        }
     

    }
});
//game over
function gameOver(won, msg) {
    //make color var
    let color;

    //set if condition for the color
    won === true ? color = 'green' : color = 'red';

    //disable the input
    guessInput.disabled = true;

    // set the message and make the text color green
    setMessage(msg , color);

    // make the border green
    guessInput.style.borderColor = color;

    //play again?
    guessBtn.value = 'play again';

    guessBtn.className += 'play-again';
}

//get random numbers
function getRandomNum(min,max) {
    
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// setting the message
function setMessage(msg , color) {
    message.textContent = msg;
    message.style.color = color;
}