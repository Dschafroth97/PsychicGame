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
function startGame(){
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersInWord = selectedWord.split("");
    numBlanks = lettersInWord.length;

    // reset stats
    guessesLeft = 8;
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
                if(selectedWord[i] === letter && wrongLetters !=  letter){
                    blanksAndSuccesses[i] = letter;
                }
            }
        }
        else{
            if(wrongLetters.indexOf(letter) === -1) { 
                wrongLetters.push(letter); 
                guessesLeft--; 
            }
        }
    // console.log(blanksAndSuccesses);
}

function roundComplete(){

    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

    if (lettersInWord.toString() == blanksAndSuccesses.toString()){
        winCount++;
        alert("You Win! " + "The answer was: " + selectedWord)

        document.getElementById("winCounter").innerHTML = winCount;
        startGame();
    }
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

// Register keyclicks

document.onkeyup = function(event){
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();

    // console.log(letterGuessed);
}