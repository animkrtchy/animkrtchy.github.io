const board = document.getElementById("game-board");
const instrectionText = document.getElementById("instraction-text");
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highscore");
var audio = new Audio("XPT5HRY-video-game.mp3")
let gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let isGameStarted = false;
let gameSpeedDeley = 200;
let highScore = 0;
let gameIntervalId;

const scoreToLevelMap = {
    10 : 1,
    22 : 2,
    36 : 3,
    52 : 4,
    70 : 5
  };

  
function draw() {
    board.innerHTML = ""
    drawSnake();
    drawFood();
    snakeScore();
    audio.play();
}

function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = creatElement("div", "snake");
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);


    });

}

function creatElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}


function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;

}

//  draw();

function drawFood() {
    if (isGameStarted) {
    let foodElement = creatElement("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement);
    }
}

function generateFood() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;

    return { x, y }

}



function move() {
    let head = { ...snake[0] };

    switch (direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        increseSpeed();
        clearInterval(gameIntervalId);
        gameIntervalId = setInterval(() => {
            move();
            // checkCollision();
            draw()
        }, gameSpeedDeley);

    } else {
        snake.pop();
    }
}

function startGame() {
    isGameStarted = true;
    instrectionText.style.display = "none";
    logo.style.display = "none";

    gameIntervalId = setInterval(() => {
        move();
        checkCollision()
        draw()
    }, gameSpeedDeley);
}

function hendleKeyPress(e) {

    if ((!isGameStarted && e.code === "Space") ||
        (!isGameStarted && e.key === " ")) {
        startGame();
    } else {
        switch (e.key) {
            case "ArrowUp":
                direction = "up"
                break;
            case "ArrowDown":
                direction = "down";
                break;
            case "ArrowLeft":
                direction = "left";
                break;
            case "ArrowRight":
                direction = "right";
                break;
        }
    }
}

function checkCollision() {
    let head = { ...snake[0] };
    if (head.x < 1 || head.x > gridSize ||
        head.y < 1 || head.y > gridSize) {
        resetGame();
    }


    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }

    }


}

function resetGame() {
    stopGame();
    updateHighScore();
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    direction = "right";

    snakeScore();
}

function stopGame() {
    clearInterval(gameIntervalId);
    isGameStarted = false;
    logo.style.display = "block";
    instrectionText.style.display = "block"
}

function snakeScore(){
    let currentScore = snake.length -1;
    score.textContent = currentScore.toString().padStart(3,"0")
}

function updateHighScore(){

    let curentScore  = snake.length - 1;
    if(curentScore > highScore){
         highScore = curentScore;
    }

    highScoreText.textContent = highScore.toString().padStart(3, "0");
    highScoreText.style.display = "block";
}


function changeSpeed(score) { if (score >= 5 && gameSpeed === 200) { gameSpeed -= 10;} 
if (score >= 5 && gameSpeed === 190) { gameSpeed -= 10; } 
if (score >= 5 && gameSpeed === 180) { gameSpeed -= 10; } 
if (score >= 5 && gameSpeed === 170) { gameSpeed -= 10; } 
if (score >= 5 && gameSpeed === 160) { gameSpeed -= 10; } 
 if (score >= 5 && gameSpeed === 150) { gameSpeed -= 10; 
 if (score >= 5 && gameSpeed === 140) { gameSpeed -= 10; }}
 }

 document.addEventListener("keydown", hendleKeyPress);


 