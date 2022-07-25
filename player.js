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
            this.collisionCircleX = this.x+this.width/1.6;
            this.collisionCircleY = this.y+this.height/2;
            this.collisionCircleR = this.width/3;
            ctx.beginPath();
            ctx.arc(this.collisionCircleX, this.collisionCircleY, this.collisionCircleR, 0, 2*Math.PI);
            ctx.stroke();
        }
    }
    enemyCollision(enemies){
        enemies.forEach(enemy => {
            if(this.playerAttacking()){
                const dx = enemy.collisionCircleX - this.collisionCircleX; 
                const dy = enemy.collisionCircleY - this.collisionCircleY;
                const dr = dx*dx + dy*dy;

                // console.log(this.collisionCircleR, enemy.collisionCircleR);

                if(Math.sqrt(dr) < this.collisionCircleR + enemy.collisionCircleR){
                    enemy.dead = true;
                    this.game.score++;
                }
            }else{
                let enemyCircle = {
                    x: enemy.collisionCircleX,
                    y: enemy.collisionCircleY,
                    r: enemy.collisionCircleR
                }
                let playerRectangle = {
                    A: {x: this.x+this.width/3, y: this.y+20},
                    B: {x: this.x+this.width/3, y: this.y+20 + this.height-20},
                    C: {x: this.x+this.width/3 + this.width/3, y: this.y+20 + this.height-20},
                    D: {x: this.x+this.width/3 + this.width/3, y: this.y+20},
                }
                if(this.intersectCircle(enemyCircle, playerRectangle.A, playerRectangle.B,playerRectangle.C, playerRectangle.D))
                {
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
    intersectCircle(S, A, B, C, D){
        if(S.y >= D.y && S.y <= C.y){
            // S.y centar a D.y krajnja gornja, C.y krajnja donja tacka strane
            // treba mi da rastojanje centra od str bude manje od r
            if((Math.abs(S.x - D.x) < S.r)||(Math.abs(S.x - A.x) < S.r)){
                return true;
            }
        }else if(S.x >= A.x && S.x <= D.x){
            if((Math.abs(S.y - A.y) < S.r)||(Math.abs(S.y+ - B.y) < S.r)){
                return true;
            }
        }
        return false;
    }
}