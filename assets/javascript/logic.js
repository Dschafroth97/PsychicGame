// GLOBAL VARIABLES
// =====================================================================
var wordOptions = ["donovan","eric","stephanie","dustin","matt","onix","jose","charles","trevor","cole","jackson","joshua","jerry","javier","carolyn","sean"];
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];


// Game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 8;

// FUNCTIONS    
// =====================================================================

// Start game function
function startGame(){

    // select random word from wordOptions 
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    // split each letter from selcted word into an array
    lettersInWord = selectedWord.split("");
    // setting number of blanks to reference selectedWord for underscores later
    numBlanks = lettersInWord.length;

    // reset stats
    guessesLeft = 8;
    wrongLetters = [];
    blanksAndSuccesses = [];

    // populate blanksAndSuccesses
    for (var i=0;i<numBlanks;i++){
        
        // pushes _'s to blanksAndSuccesses
        blanksAndSuccesses.push("_");
    }

    // Change HTML to reflect
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;

    // Testing
    // console.log(lettersInWord);
    // console.log(numBlanks);
    // console.log(blanksAndSuccesses);
}

// hangman picture display function
function imageDisplay(){

    // setting displaycount = guessesLeft -1 to correctly represent array index's
    displayCount = guessesLeft - 1;
    // stores images for hangmans
    var images = [
        "assets/images/hangman8.jpg",
        "assets/images/hangman7.jpg",
        "assets/images/hangman6.jpg",
        "assets/images/hangman5.jpg",
        "assets/images/hangman4.jpg",
        "assets/images/hangman3.jpg",
        "assets/images/hangman2.jpg",
        "assets/images/hangman1.jpg",
    ];
    // setting img src to reflect correct image
    document.getElementById("hangman").src = images[displayCount];
}

// checking the users letter guess (will later add a document.onkeyup to run this function)
function checkLetters(letter){

    // setting boolean to false in order to check if letter is a correct guess
    var isLetterInWord = false;

    // looping through selectedWord array to check if letter is correct
    for (var i=0; i<numBlanks;i++){
        // if correct, flip isLetterInWord to true
        if(selectedWord[i] === letter){
            isLetterInWord = true;
        }
    }
        // if isLetterInWord = true, loop through and 
        if(isLetterInWord){
            for (var i=0;i<numBlanks;i++){
                // push correct letter guess to blanksAndSuccesses array
                if(selectedWord[i] === letter){
                    blanksAndSuccesses[i] = letter;
                }
            }
        }
        // if guess is false run this logic
        else{
            // check to see if letter is already guessed
            if(wrongLetters.indexOf(letter) === -1) {
                // if not push to wrong letters and decrement guesses
                wrongLetters.push(letter); 
                guessesLeft--; 
            }
        }
    // console.log(blanksAndSuccesses);
}

// function to check if user won or lost
function roundComplete(){

    // pull word and guesses back into javascript
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

    // test to see if the lettersInWord is equal to blankAndSuccesses, if so, you win!
    if (lettersInWord.toString() == blanksAndSuccesses.toString()){
        winCount++;
        alert("You Win! " + "The answer was: " + selectedWord)

        document.getElementById("winCounter").innerHTML = winCount;
        startGame();
    }
    // if user has used all guesses but has not gotten the correct word completed, you lose!
    else if(guessesLeft == 0){
        lossCount++;
        alert("You Lost! " + "The Correct answer was: " + selectedWord)

        document.getElementById("lossCounter").innerHTML = lossCount;
        startGame();
    }
}

// MAIN PROCESS
// =====================================================================
startGame();
imageDisplay();

// Register keyclicks
document.onkeyup = function(event){
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();
    imageDisplay();

    // console.log(letterGuessed);
}