import Ball from "./ball.js";
import Paddle from "./paddle.js";
import InputHandler from "./input.js";

export default class Game{
    constructor(gameWidht, gameHeight){

        this.gameWidht = gameWidht;
        this.gameHeight = gameHeight;
        
    }
        // METHODS
    start(){

        let paddle = new Paddle(this);
        let ball = new Ball(this);
            
        new InputHandler(paddle);
    }

}