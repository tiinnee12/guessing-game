
//#Global Variables

var hasTries;
var colorChange;
var gameStarted = false;
var gameMode;
var randomNumber;
var guessingNumber;


//#stattin a new game
mediumGame();

//##Button event handler using vanilla javaScript
document.getElementById("btn-guess").addEventListener("click", function(){

    //Value of the number the user gives

    guessingNumber = parseInt(document.getElementById("guess-inp").value);

    if(gameStarted){
        checkIfWin(randomNumber, guessingNumber);
    }else{
        $("#message").html('<div id="you-lose" class="alert alert-warning" role="alert"><strong>Start a new game first!</strong> ');
    }
});


//##Button new Game
document.getElementById("btn-new-game").addEventListener("click", function(){
        newGame(gameMode);
});


//##Button hard game
document.getElementById("btn-hard-game").addEventListener("click", function(){
        hardGame();
});


//##Button medium game
document.getElementById("btn-medium-game").addEventListener("click", function(){
        mediumGame();
});


//##Button easy game
document.getElementById("btn-easy-game").addEventListener("click", function(){
        easyGame();
});

//##check if win
function checkIfWin(randNum, playerNum){

    if(randNum === playerNum){
        winGame();
    }else{
        gamePlay();
    }
};

//##Create lifes
function lifes(num){
    var div = '<div id="life0" class="life"></div>';
    for(var i =0; i< num; i++){
        $("#lifes").html(div);
        div += '<div id="life'+(i+1)+'"class="life"></div>';
    }
}


//##Wing game
function winGame(){

  $("#guesses-left").text("You won!");
  gameStarted = false;
  $("#btn-guess").addClass("disabled");
  $("#message").html('<div id="you-won" class="alert alert-success" role="alert"><strong>:D</strong> you won! You can start a new game. The number was <span style="{font-size=40}">'+randomNumber+'</span></div>');

};


//##lose game

function lost(){
  gameStarted = false;
  $("#btn-guess").addClass("disabled");
  $("#number").text(randomNumber);
  $("#message").html('<div id="you-lose" class="alert alert-danger" role="alert"><strong>:(</strong> You ran out of tries, start a new game. The number was <span id="number"></span>'+randomNumber+'.</div>');

};

//#Remove life

function removeLife(num){
    var life = num - 1;

        return "life"+life;

}

//## change color

function changeColor(){
    if(hasTries <= (colorChange/2)){
        $(".life").css("background-color", "#FFD800");
        $("#guesses-left").css("color", "#FFD800");
    }if(hasTries <= (colorChange/4)){
        $(".life").css("background-color", "red");
        $("#guesses-left").css("color", "red");
    }
};


//#continue game untill end
function gamePlay(){
    var hasLife = removeLife(hasTries);
    hasTries--;
    numLowOrHigh()
    $("#"+hasLife).remove();
    if(hasTries >= 1){
        changeColor();
    }else{
        lost();
    }
};


//check if numLowor right

function numLowOrHigh(){
    if(guessingNumber > randomNumber){
        $("#guesses-left").text("Too High");
    }else{
         $("#guesses-left").text("Too Low");
    }
}

//##Game modes
function easyGame(){
    hasTries = 12;
    colorChange = 12;
    gameMode = "easy";
    $("#game-mode").text("Easy");
    randomNumber = Math.floor((Math.random() * 100) +1 );
    startingGame(hasTries);
    lifes(hasTries);
};

function mediumGame(){
    randomNumber = Math.floor((Math.random() * 100) +1 );
    hasTries = 8;
    colorChange = 8;
    gameMode = "medium";
    $("#game-mode").text("Medium");
    startingGame(hasTries);
    lifes(hasTries);
};

function hardGame(){
    randomNumber = Math.floor((Math.random() * 100) +1 );
    hasTries = 6;
    gameMode = "hard";
    colorChange = 6;
    $("#game-mode").text("Hard");
    startingGame(hasTries);
    lifes(hasTries);
};

function newGame(gameMode){
    $("#btn-guess").removeClass("disabled");
    switch(gameMode){
        case "hard":
            hardGame();
            break;
        case "easy":
            easyGame();
            break;
        case "medium":
            mediumGame();
            break;
        default:
            mediumGame();
    }

};

//##start Game setting

function startingGame(tries){
    gameStarted = true;
    hasTries = tries;
    lifes(hasTries);
     $("#guesses-left").css("color", "black");
    $("#btn-guess").removeClass("disabled");
    $("#message").html("");
}
