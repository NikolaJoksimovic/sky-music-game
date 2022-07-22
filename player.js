export default class Player{
    constructor(game){
        this.game = game;
        this.image = document.getElementById('player-img');
        
        // positioning and dimensions
        this.gameWidth = game.width;
        this.gameHeight = game.height;
        this.width = 250;
        this.height = 200;
        this.x = 0;
        this.y = this.gameHeight-this.height-50;
        
        //movement
        this.verticalJump = 0;
        this.canGoUp = false;
        this.goUpAgain = false;
        
        
        // animations
        this.frameX = 0;
        this.frameY = 4;
        this.maxFrames = 9;
        this.fps = 16.5;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;

        // other
        this.markedForDeletion = false;
        this.gameOver = false;
        this.radiusCollisionCircle = this.width/3.5;
    }
    update(input, deltaTime, enemies){
        
        // horizontal movement
        this.x += input.speed;
        
        if(this.x < 0){
            this.x = 0;
        }
        if(this.x > this.gameWidth - this.width){
            this.x = this.gameWidth - this.width;
        }

        // vertical movement
        if(input.goUp && !this.goUpAgain){
            this.canGoUp = true;
            this.goUpAgain = true;
        }
        if(this.canGoUp){
            this.y += input.gravity;
            this.y += input.vy;
        }else{
            this.y +=input.gravity;
        }
        
        if(this.y <= this.gameHeight-3.5*this.height){
            this.y = this.gameHeight-3.5*this.height;
            this.canGoUp = false;
        }
        if(this.y >= this.gameHeight-this.height-50){
            this.y = this.gameHeight-this.height-50;
            this.goUpAgain = false;
        }

        // animations
        if(!this.onGround()){
            this.frameInterval = 2000/this.fps;
            this.frameY = 7;
        }else{
            if(input.speed!=0){
                this.frameInterval = 500/this.fps;
            }else{
                this.frameInterval = 1000/this.fps;
            }
            this.frameY = 8;
        }
        if(this.frameTimer >= this.frameInterval){
            if(this.frameX >= this.maxFrames){
                this.frameX = 0;
            }else{
                this.frameX++;
            }
            this.frameTimer = 0;
        }else{
            this.frameTimer+=deltaTime;
        }

        // this.enemyCollision(enemies);
    }
    draw(ctx){
        ctx.drawImage(this.image, this.frameX*250, this.frameY*200, this.width, this.height,  this.x, this.y, this.width, this.height);
    }
    onGround(){
        return this.y >= this.gameHeight-this.height-50;
    }
    
    enemyCollision(enemies){
        enemies.forEach(enemy => {
            const dx = enemy.x + enemy.width/2 - this.x - this.width/2;
            const dy = enemy.y + enemy.width/2 - this.y-this.width/2;
            const dr = dx*dx + dy*dy;
            if(dr < Math.pow((this.radiusCollisionCircle + enemy.radiusCollisionCircle), 2)){
                enemy.dead = true;
                this.gameOver = true;
            }
        });
    }


}