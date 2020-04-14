var pressedButtons = [];
var moves = [];

var isStart = false;


addEventListener("keypress", function(event) {
    if (!isStart) {
        isStart = true;
        moves = [];
        $("#level").html("");
        startGame(moves);
    }
})

function startGame(moves) {
    var isStart = true;
    $("#level-title").html("Level " + (moves.length + 1));
    setTimeout(function() {
        moves = addMove(moves);
    }, 1000);
}

$("#green, #red, #yellow, #blue").click(function(event) {

    pressButton(this.id, 100);
    if (this.id == "green") {
        pressedButtons.push(1);
    } else if (this.id == "red") {
        pressedButtons.push(2);
    } else if (this.id == "yellow") {
        pressedButtons.push(3);
    } else if (this.id == "blue") {
        pressedButtons.push(4);
    }

    checkMove(pressedButtons.length - 1, moves);


})

function checkMove(no, moves) {
    if (moves[no] === pressedButtons[no]) {

        if (moves.length === pressedButtons.length) {
            pressedButtons = [];
            startGame(moves);
        }

    } else {
        endGame();
        reset(moves);
    }
}

function addMove(moves) {
    moves[moves.length] = Math.floor((Math.random() * 4) + 1);
    switch (moves[moves.length - 1]) {
        case 1:
            pressButton("green", 300);
            break;
        case 2:
            pressButton("red", 300);
            break;
        case 3:
            pressButton("yellow", 300);
            break;
        case 4:
            pressButton("blue", 300);
            break;
    }
    return moves;
}

function pressButton(color, time) {
    $("#" + color).addClass("pressed");
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
    setTimeout(function() {
        $("#" + color).removeClass("pressed")
    }, time);
}


function endGame() {
    $("body").addClass("game-over");

    $("body").addClass("game-over");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    setTimeout(function() {
        $("body").removeClass("game-over")
    }, 200);
}

function reset(moves) {
    $("#level-title").html("Game Over! Press any key to reset!");
    if (moves.length === 1) {
        $("#level").html("Level 0!");
    } else {
        $("#level").html("Level " + (moves.length - 1) + " !");
    }
    pressedButtons = [];
    isStart = false;


}