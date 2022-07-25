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
        this.y = game.height/2 + this.height;
        
        // animation
        this.speed = 10;
        this.maxFrame = 10;
        this.fps = 16.5;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;
        this.angle = 0; 
        this.angleSpeed = Math.random()*0.2;

        // other stuff
        this.markedForDeletion = false;
        this.dead = false;

        // collision
        
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
        this.y += 3* Math.cos(this.angle);
        this.angle += this.angleSpeed;
        if(this.x < 0 - this.width){
            this.markedForDeletion = true;
        }
    }
    draw(ctx){
        ctx.drawImage(this.image, this.frameX*this.width, this.frameY*this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        
        // hitboxes
        if(true){
            ctx.strokeStyle = 'white';
            this.collisionCircleX = this.x+this.width/2-5;
            this.collisionCircleY = this.y+this.height/2-10;
            this.collisionCircleR = this.width/2.5;
            ctx.beginPath();
            ctx.arc(this.collisionCircleX, this.collisionCircleY, this.collisionCircleR, 0, 2*Math.PI);
            ctx.stroke();
        }
    }
}