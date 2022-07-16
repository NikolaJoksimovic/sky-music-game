import Ball from "./ball.js";
import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import { buildLevel, level1 } from "./levels.js";
import Brick from "./brick.js";

export default class Game{
    constructor(gameWidth, gameHeight){

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        
    }
        // METHODS
    start(){

        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        // let bricks = [];
        let bricks = buildLevel(this, level1);

        this.gameObjects = [this.paddle, this.ball, ...bricks]; // ...bricks dodaje svaki element bricksa u niz
        new InputHandler(this.paddle);

    }
    update(deltaTime){
        //updejtujemo poziciju..
        // delta Time sluzi jer ne rade svi racunari isto. da ne bi bilo seckanja.
        this.gameObjects.forEach( object => object.update(deltaTime))
        this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion);
    }
    draw(ctx){
        this.gameObjects.forEach(object => object.draw(ctx));
    }

}