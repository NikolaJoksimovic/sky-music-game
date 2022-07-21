export default class Enemy{
    constructor(game){
        this.game = game;
        
        // size and positioning
        this.width = 100;
        this.height = 100;
        this.image = document.getElementById('enemy-ghost-img');
        this.frameX = 0;
        this.frameY = 0;
        this.x = game.width - this.width;
        this.y = game.height - 2.2*this.height;
        
        // animation
        this.speed = 4;
        this.maxFrame = 10;
        this.fps = 16.5;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;

        // other stuff
        this.radiusCollisionCircle = this.width/2.5;
        this.markedForDeletion = false;
        this.dead = false;
    }

    update(input, deltaTime, enemies){
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
        if(this.x < 0 - this.width){
            this.markedForDeletion = true;
        }
    }
    draw(ctx){

        ctx.strokeStyle = 'white';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.beginPath();
        ctx.arc(this.x+this.width/2, this.y+this.height/2, this.radiusCollisionCircle, 0, Math.PI*2);
        ctx.stroke();

        ctx.drawImage(this.image, this.frameX*this.width, this.frameY*this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}