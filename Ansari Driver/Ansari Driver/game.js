let player = document.getElementById("player");

let obstacle1 = document.querySelector(".obstacle1");
let obstacle2 = document.querySelector(".obstacle2");
let obstacle3 = document.querySelector(".obstacle3");

let scoreDisplay = document.getElementById("score");
let finalScore = document.getElementById("finalScore");

let startScreen = document.getElementById("startScreen");
let gameOverScreen = document.getElementById("gameOverScreen");

let leftBtn = document.getElementById("leftBtn");
let rightBtn = document.getElementById("rightBtn");

let playerPosition = 50;

let score = 0;

let speed = 5;

let gameRunning = false;

let roadWidth = 420;


// Start game

function startGame() {

    startScreen.style.display = "none";

    gameRunning = true;

    score = 0;

    speed = 5;

    playerPosition = 50;

    player.style.left = playerPosition + "%";

    obstacle1.style.top = "-100px";
    obstacle2.style.top = "-400px";
    obstacle3.style.top = "-700px";

    gameLoop();
}


// Move left

function moveLeft() {

    if (!gameRunning) return;

    playerPosition -= 8;

    if (playerPosition < 8) {
        playerPosition = 8;
    }

    player.style.left = playerPosition + "%";
}


// Move right

function moveRight() {

    if (!gameRunning) return;

    playerPosition += 8;

    if (playerPosition > 92) {
        playerPosition = 92;
    }

    player.style.left = playerPosition + "%";
}


// Keyboard controls

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowLeft") {
        moveLeft();
    }

    if (event.key === "ArrowRight") {
        moveRight();
    }

});


// Mobile buttons

leftBtn.addEventListener("touchstart", function(event) {

    event.preventDefault();

    moveLeft();

});

rightBtn.addEventListener("touchstart", function(event) {

    event.preventDefault();

    moveRight();

});


// Collision detection

function collision(player, obstacle) {

    let playerRect = player.getBoundingClientRect();

    let obstacleRect = obstacle.getBoundingClientRect();

    return !(
        playerRect.bottom < obstacleRect.top ||
        playerRect.top > obstacleRect.bottom ||
        playerRect.right < obstacleRect.left ||
        playerRect.left > obstacleRect.right
    );

}


// Move obstacle

function moveObstacle(obstacle, resetPosition) {

    let top = parseFloat(
        window.getComputedStyle(obstacle).top
    );

    top += speed;

    obstacle.style.top = top + "px";


    if (top > window.innerHeight) {

        obstacle.style.top =
            resetPosition + "px";

        score++;

        scoreDisplay.textContent = score;

        if (score % 10 === 0) {

            speed += 1;

        }

    }


    if (collision(player, obstacle)) {

        gameOver();

    }

}


// Main game loop

function gameLoop() {

    if (!gameRunning) return;

    moveObstacle(obstacle1, -200);

    moveObstacle(obstacle2, -500);

    moveObstacle(obstacle3, -800);

    requestAnimationFrame(gameLoop);

}


// Game over

function gameOver() {

    gameRunning = false;

    finalScore.textContent = score;

    gameOverScreen.style.display = "flex";

}


// Restart

function restartGame() {

    gameOverScreen.style.display = "none";

    startGame();

}