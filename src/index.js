import Game from "./game.js";

const   canvasEl = document.getElementById("gameScreen"),
startBtnEl = document.getElementById("startBtn"),
ctx = canvasEl.getContext("2d");

const GAME_WIDTH = 1024;
const GAME_HEIGHT = 800;

let lastTime = 0;
let game = new Game(GAME_WIDTH, GAME_HEIGHT);
let audio1 = new Audio();
audio1.src = "../assets/sound/backgroundSong1.mp3"

// START THE GAME
startBtnEl.addEventListener("click", (e)=>{
    audio1.currentTime = 0;
    audio1.play();

    clearRect();

    game.start();

    requestAnimationFrame(gameLoop);
});


function gameLoop(timestamp){
    // console.log(timestamp);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    clearRect();
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(gameLoop);

}

function clearRect(){
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}
