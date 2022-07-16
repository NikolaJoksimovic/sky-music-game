import { detectCollision } from "./collisionDetection.js";

export default class Ball{

    constructor(game){

        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.ballEl = document.getElementById("ball");
        this.position = {x:10, y:10};
        this.speed = {x:7, y:7};
        this.size = 20; //kodiramo velicinu lopte ali meni ne treba to trebutno..mozda za powerUp
    }

    draw(ctx){
        ctx.drawImage(this.ballEl, this.position.x, this.position.y, this.size, this.size);
    }

    update(deltaTime){

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        


        // wall left or right
        if(this.position.x > this.gameWidth - this.size || this.position.x < 0){
            this.speed.x = -this.speed.x;
        }
        // wall top or bottom
        if(this.position.y > this.gameHeight - this.size || this.position.y < 0){
            this.speed.y = -this.speed.y;
        }

        if(detectCollision(this, this.game.paddle)){
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }
    }
}