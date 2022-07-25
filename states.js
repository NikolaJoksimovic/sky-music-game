const states = {
    IDLE:               0,
    RUNNING_RIGHT:      1,
    RUNNING_LEFT:       2,
    JUMPING:            3,
    FALLING:            4,
    JUMPING_RIGHT:      5,
    JUMPING_LEFT:       6,
    FALLING_RIGHT:      7,
    FALLING_LEFT:       8,
    ATTACKING:          9,
    JUMP_ATTACKING:     10
}

class State{
    constructor(state){
        this.state = state;
    }
}

export class Idle extends State{
    constructor(player) {
        super('IDLE');
        this.player = player;
    }

    enter(){
        this.player.frameInterval = 1000/this.player.fps;
        this.player.maxFrames = 9;
        this.player.frameY = 8;
        this.player.frameX = 0;
        this.player.speed = 0;
    }
    handleInput(input){
        if(input.includes('ArrowRight')){
            this.player.setState(states.RUNNING_RIGHT);
        }else if(input.includes('ArrowLeft')){
            this.player.setState(states.RUNNING_LEFT);
        }else if(input.includes('ArrowUp') && this.player.playerOnGround()){
            this.player.setState(states.JUMPING);
        }else if(input.includes(' ')){
            this.player.setState(states.ATTACKING);
        }
    }
}
export class RunningRight extends State{
    constructor(player) {
        super('RUNNING_RIGHT');
        this.player = player;
    }
    
    enter(){
        this.player.frameInterval = 500/this.player.fps;
        this.player.maxFrames = 9;
        this.player.frameY = 8;
        this.player.speed = this.player.maxSpeed;
    }
    handleInput(input){
        if(input.includes('ArrowLeft') && comesAfter('ArrowLeft', 'ArrowRight', input)){
                this.player.setState(states.RUNNING_LEFT);
        }else if(!input.includes('ArrowRight')){
            this.player.setState(states.IDLE);
        }else if(input.includes('ArrowUp') && this.player.playerOnGround()){
            this.player.setState(states.JUMPING);
        }else if(input.includes(' ')){
            this.player.setState(states.ATTACKING);
        }
    }
}
export class RunningLeft extends State{
    constructor(player) {
        super('RUNNING_LEFT');
        this.player = player;
    }

    enter(){
        this.player.frameInterval = 500/this.player.fps;
        this.player.maxFrames = 9;
        this.player.frameY = 8;
        this.player.speed = -this.player.maxSpeed;
    }
    handleInput(input){
        if(input.includes('ArrowRight') && comesAfter('ArrowRight', 'ArrowLeft', input)){
                this.player.setState(states.RUNNING_RIGHT);
        }else if(!input.includes('ArrowLeft')){
            this.player.setState(states.IDLE);
        }else if(input.includes('ArrowUp') && this.player.playerOnGround()){
            this.player.setState(states.JUMPING);
        }else if(input.includes(' ')){
            this.player.setState(states.ATTACKING);
        }
    }
}

export class Jumping extends State{
    constructor(player) {
        super('JUMPING');
        this.player = player;
    }

    enter(){
        this.player.frameInterval = 2000/this.player.fps;
        this.player.maxFrames = 4;
        this.player.frameX = 0;
        this.player.frameY = 7;
        this.player.vy = -30;
    }
    handleInput(input){
        if(this.player.vy > this.player.gravity){
            this.player.setState(states.FALLING);
        }else if(input.includes('ArrowRight')){
            this.player.setState(states.JUMPING_RIGHT);
        }else if(input.includes('ArrowLeft')){
            this.player.setState(states.JUMPING_LEFT);
        }else if(input.includes(' ')){
                this.player.setState(states.JUMP_ATTACKING);
        }
    }
}
export class JumpingRight extends State{
    constructor(player) {
        super('JUMPING_RIGHT');
        this.player = player;
    }

    enter(){
        this.player.speed = this.player.maxSpeed;
    }
    handleInput(input){
        if(this.player.vy > this.player.gravity){
            this.player.setState(states.FALLING);
        }else if(input.includes('ArrowLeft') && comesAfter('ArrowLeft', 'ArrowRight', input)){
            this.player.setState(states.JUMPING_LEFT);
        }else if(input.includes(' ')){
                this.player.setState(states.JUMP_ATTACKING);
        }
    }
}
export class JumpingLeft extends State{
    constructor(player) {
        super('JUMPING_LEFT');
        this.player = player;
    }

    enter(){
        this.player.speed = -this.player.maxSpeed;
    }
    handleInput(input){
        if(this.player.vy > this.player.gravity){
            this.player.setState(states.FALLING);
        }else if(input.includes('ArrowRight') && comesAfter('ArrowRight', 'ArrowLeft', input)){
            this.player.setState(states.JUMPING_RIGHT);
        }else if(input.includes(' ')){
                this.player.setState(states.JUMP_ATTACKING);
        }
    }
}
export class Falling extends State{
    constructor(player) {
        super('FALLING');
        this.player = player;
    }

    enter(){
        this.player.frameY = 7;
        this.player.frameX = 3;
    }
    handleInput(input){
        if(this.player.playerOnGround()){
            this.player.setState(states.IDLE);
        }else if(input.includes('ArrowRight')){
            this.player.setState(states.FALLING_RIGHT);
        }else if(input.includes('ArrowLeft')){
            this.player.setState(states.FALLING_LEFT);
        }else if(input.includes(' ')){
                this.player.setState(states.JUMP_ATTACKING);
        }
    }
}
export class FallingRight extends State{
    constructor(player) {
        super('FALLING_RIGHT');
        this.player = player;
    }

    enter(){
        this.player.speed = this.player.maxSpeed;
    }
    handleInput(input){
        if(this.player.playerOnGround()){
            this.player.setState(states.IDLE);
        }else if(input.includes('ArrowLeft') && comesAfter('ArrowLeft', 'ArrowRight', input)){
            this.player.setState(states.FALLING_LEFT);
        }else if(input.includes(' ')){
                this.player.setState(states.JUMP_ATTACKING);
        }
    }
}
export class FallingLeft extends State{
    constructor(player) {
        super('FALLING_LEFT');
        this.player = player;
    }

    enter(){
        this.player.speed = -this.player.maxSpeed;
    }
    handleInput(input){
        if(this.player.playerOnGround()){
            this.player.setState(states.IDLE);
        }else if(input.includes('ArrowRight') && comesAfter('ArrowRight', 'ArrowLeft', input)){
            this.player.setState(states.FALLING_RIGHT);
        }else if(input.includes(' ')){
                this.player.setState(states.JUMP_ATTACKING);
        }
    }
}

function comesAfter(element1, element2, array){
    return array.indexOf(element1) > array.indexOf(element2);
}

export class Attacking extends State{
    constructor(player) {
        super('ATTACKING');
        this.player = player;
    }
    enter(){
        this.player.frameInterval = 100/this.player.fps; //miliseconds
        this.player.frameY = 0;
        this.player.frameX = 2;
        this.player.maxFrames = 7;
        this.player.speed = -this.player.game.background.layer5Speed;
        this.player.attackAnimationTimer = 0;
    }
    handleInput(input){
        if(!this.player.playerAttacking()){
            this.player.setState(states.IDLE);
        }
    }
}

export class JumpAttacking extends State{
    constructor(player) {
        super('JUMP_ATTACKING');
        this.player = player;
    }
    enter(){
        this.player.frameInterval = 100/this.player.fps; //miliseconds
        this.player.frameY = 6;
        this.player.frameX = 2;
        this.player.maxFrames = 7;
        this.player.speed = 0;
        this.player.attackAnimationTimer = 0;
    }
    handleInput(input){
        if(!this.player.playerAttacking()){
            this.player.setState(states.IDLE);
        }
    }
}