import Paddle from '../src/paddle.js';
import Ball from './ball.js';
import InputHandler  from './input.js';

const   canvasEl = document.getElementById("gameScreen"),
ctx = canvasEl.getContext("2d");

const GAME_WIDTH = 900;
const GAME_HEIGHT = 600;
clearRect();


// START THE GAME
let lastTime = 0;
requestAnimationFrame(gameLoop);



function gameLoop(timestamp){
    // console.log(timestamp);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    clearRect();
    paddle.update(deltaTime); //updejtujemo poziciju..
    // delta Time sluzi jer ne rade svi racunari isto. da ne bi bilo seckanja.
    ball.update(deltaTime);

    paddle.draw(ctx);
    ball.draw(ctx);

    requestAnimationFrame(gameLoop);

}

function clearRect(){
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}
