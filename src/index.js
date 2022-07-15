import Game from "./game.js";
const   canvasEl = document.getElementById("gameScreen"),
ctx = canvasEl.getContext("2d");

const GAME_WIDTH = 1024;
const GAME_HEIGHT = 800;
clearRect();


// START THE GAME
let game = new Game(GAME_WIDTH, GAME_HEIGHT);
game.start();
let lastTime = 0;
requestAnimationFrame(gameLoop);



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
