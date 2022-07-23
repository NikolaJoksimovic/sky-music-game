import {Standing, RunningRight, JumpingRight, RunningLeft, JumpingLeft} from './states.js'
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
        this.states = [new Standing(this), new RunningRight(this), new JumpingRight(this), new RunningLeft(this), new JumpingLeft(this)];
        this.currentState = this.states[0];
        this.speed = 0;
        this.maxSpeed = 8;
        this.vy = 0;
        this.gravity = 0.98;
        this.runningLeft = false;
        this.runningRight = false;
        
        // animations
        this.frameX = 0;
        this.frameY = 0;
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
        this.currentState.handleInput(input);
        console.log(this.runningLeft, this.runningRight);

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

        // this.enemyCollision(enemies);
    }
    draw(ctx){
        ctx.drawImage(this.image, this.frameX*250, this.frameY*200, this.width, this.height,  this.x, this.y, this.width, this.height);
    }
    
    setState(state){
        this.currentState = this.states[state];
        this.currentState.enter();
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
    playerOnGround(){
        return this.y >= this.gameHeight - this.height-50? true : false;
    }
}