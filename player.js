import {
    Idle,
    RunningRight, 
    RunningLeft, 
    Jumping, 
    Falling, 
    JumpingRight, 
    JumpingLeft, 
    FallingRight, 
    FallingLeft,
    Attacking,
    JumpAttacking
} from './states.js'

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
        this.y = this.gameHeight-this.height-15;
        
        // animations
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrames = 9;
        this.fps = 16.5;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;
        this.attackAnimationTimer = 290;
        this.attackAnimationInterval = 290;

        //movement
        this.states = [
            new Idle(this),
            new RunningRight(this),
            new RunningLeft(this),
            new Jumping(this),
            new Falling(this),
            new JumpingRight(this),
            new JumpingLeft(this),
            new FallingRight(this),
            new FallingLeft(this),
            new Attacking(this),
            new JumpAttacking(this)
        ];
        this.currentState = this.states[0];
        this.currentState.enter();
        this.speed = 0;
        this.maxSpeed = 9;
        this.vy = 0;
        this.gravity = 0.98;

        // other
        this.gameOver = false;
        this.enemyCollisionEnabled = true;
        this.radiusCollisionCircle = this.width/3.5;
    }
    update(input, deltaTime, enemies){
        this.attackAnimationTimer+=deltaTime;
        this.currentState.handleInput(input);
        // horizontal movement
        this.x += this.speed;
        if(this.x < 0-this.width/3){this.x = 0-this.width/3};
        if(this.x > this.game.width - this.width*2/3){this.x = this.game.width - this.width*2/3};

        // vertical movement
        this.y += this.vy;
        if(!this.playerOnGround()){
            this.vy += this.gravity;
        }else{
            this.vy = 0;
        }
        // console.log(this.y);
        // animation
        if(this.frameTimer >= this.frameInterval){
            if(this.frameX < this.maxFrames){
                this.frameX++;
            }else{
                this.frameX = 0;
            }
            this.frameTimer = 0;
        }else{
            this.frameTimer+=deltaTime;
        }
        //Enemy colision
        if(this.enemyCollisionEnabled){
            this.enemyCollision(enemies);
        }
    }
    draw(ctx){
        ctx.drawImage(this.image, this.frameX*250, this.frameY*200, this.width, this.height,  this.x, this.y, this.width, this.height);
        
        if(true){
            ctx.strokeStyle = 'hsl(6, 93%, 71%)';
            ctx.strokeRect(this.x+this.width/3, this.y+20, this.width/3, this.height-20);

            ctx.beginPath();
            ctx.arc(this.x+this.width/1.6, this.y+this.height/2, this.width/3,0,2*Math.PI);
            ctx.stroke();
        }
    }
    enemyCollision(enemies){
        enemies.forEach(enemy => {
            const dx = enemy.x + enemy.width/2 - this.x - this.width/2;
            const dy = enemy.y + enemy.width/2 - this.y-this.width/2;
            const dr = dx*dx + dy*dy;
            if(dr < Math.pow((this.radiusCollisionCircle + enemy.radiusCollisionCircle), 2)){
                if(this.playerAttacking()){
                    enemy.dead = true;
                    this.game.score++;
                }else{
                    this.gameOver = true;
                }
            }
        });
    }
    setState(state){
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    playerOnGround(){
        return this.y >= this.gameHeight - this.height-15? true : false;
    }
    playerAttacking(){
        return this.attackAnimationTimer < this.attackAnimationInterval;
    }
}