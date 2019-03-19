// GLOBAL VARIABLES
// =====================================================================
var wordOptions = ["glasses","elephant","sandal","portal","extravagant","oculus","zero","diameter","connect","acheive","dedication","perseverance","ace","fair"];
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

// Game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 10;

// FUNCTIONS    
// =====================================================================
function startGame(){
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersInWord = selectedWord.split("");
    numBlanks = lettersInWord.length;

    // reset stats
    guessesLeft = 10;
    wrongLetters = [];
    blanksAndSuccesses = [];

    // populate blanksAndSuccesses
    for (var i=0;i<numBlanks;i++){
        
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

function checkLetters(letter){
    var isLetterInWord = false;

    for (var i=0; i<numBlanks;i++){
        if(selectedWord[i] === letter){
            isLetterInWord = true;
        }
    }

    if(isLetterInWord){
        for (var i=0;i<numBlanks;i++){
            if(selectedWord[i] === letter){
                blanksAndSuccesses[i] = letter;
            }
        }
    }
    else {
        wrongLetters.push(letter);
        guessesLeft--;
    }
    // console.log(blanksAndSuccesses);
}

function roundComplete(){

    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

    if (lettersInWord.toString() == blanksAndSuccesses.toString()){
        winCount++;
        alert("You Win!")

        document.getElementById("winCounter").innerHTML = winCount;
        startGame();
    }
    else if(guessesLeft == 0){
        lossCount++;
        alert("You Lost")

        document.getElementById("lossCounter").innerHTML = lossCount;

        startGame();
    }
}

// MAIN PROCESS
// =====================================================================
startGame();

// Register keyclicks

document.onkeyup = function(event){
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();

    // console.log(letterGuessed);
}