import { detectCollision } from "./collisionDetection.js";

export default class Brick{

    constructor(game, position){
        this.game = game;
        this.position = position;
        this.brickEl = document.getElementById("brick");

        this.width = 64;
        this.height = 24;

        this.markedForDeletion = false;
    }

    update(deltaTime){
        if(detectCollision(this.game.ball, this)){
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.markedForDeletion = true;
        }
    }

    draw(ctx){
        ctx.drawImage(this.brickEl, this.position.x, this.position.y, this.width, this.height);
    }
}