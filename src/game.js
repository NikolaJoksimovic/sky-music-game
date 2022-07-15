import Ball from "./ball.js";
import Paddle from "./paddle.js";
import InputHandler from "./input.js";

export default class Game{
    constructor(gameWidth, gameHeight){

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        
    }
        // METHODS
    start(){

        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [this.paddle, this.ball];
        new InputHandler(this.paddle);
    }
    update(deltaTime){
        //updejtujemo poziciju..
        // delta Time sluzi jer ne rade svi racunari isto. da ne bi bilo seckanja.
        this.gameObjects.forEach( object => object.update(deltaTime))
    }
    draw(ctx){
        this.gameObjects.forEach(object => object.draw(ctx));
    }

}