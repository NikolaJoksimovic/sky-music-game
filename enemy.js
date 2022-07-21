export default class Enemy{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.image = document.getElementById('enemy-ghost-img');
        this.frameX = 0;
        this.frameY = 0;
        this.x = game.width - this.width;
        this.y = game.height - 2.2*this.height;
        this.speed = 4;
        this.maxFrame = 10;
        this.fps = 16.5;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;
    }

    update(input, deltaTime){
        if(this.frameTimer > this.frameInterval){
            if(this.frameX >= this.maxFrame){
                this.frameX = 0;
            }else{
                this.frameX++;
            }
            this.frameTimer = 0;
        }else{
            this.frameTimer+=deltaTime;
        }
        this.x -= this.speed;
    }
    draw(ctx){
        ctx.drawImage(this.image, this.frameX*this.width, this.frameY*this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}