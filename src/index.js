import Paddle from '../src/paddle.js';
import InputHandler  from './input.js';

const   canvasEl = document.getElementById("gameScreen"),
ctx = canvasEl.getContext("2d");

const GAME_WIDTH = 900;
const GAME_HEIGHT = 600;
clearRect();

let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
paddle.draw(ctx);
new InputHandler(paddle);


let lastTime = 0;
gameLoop(0);



function gameLoop(timestamp){
    // console.log(timestamp);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    clearRect();
    paddle.update(deltaTime); //updejtujemo poziciju..
    // delta Time sluzi jer ne rade svi racunari isto. da ne bi bilo seckanja.

    paddle.draw(ctx);

    requestAnimationFrame(gameLoop);

}

function clearRect(){
    ctx.clearRect(0, 0, 900, 600);
}
