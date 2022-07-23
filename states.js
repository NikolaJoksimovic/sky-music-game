export const states = {
    
    STANDING:       0,
    RUNNING_RIGHT:  1,
    JUMPING_RIGHT:  2,
    RUNNING_LEFT:   3,
    JUMPING_LEFT:   4,
}

class State{
    constructor(state){
        this.state = state;
    }
}
export class Standing extends State{
    constructor(player){
        // super mora da se pozove pre koriscenja this.
        super('STANDING');
        this.player = player;
    }
    
    // Metodi kada player udje u stanje i dobijanje inputa..
    enter(){
        this.player.frameY = 4;
        this.player.speed = 0;
    }
    handleInput(input){
        if(input === 'ArrowRightPressed'){
            this.player.setState(states.RUNNING_RIGHT);
        }else if(input === 'ArrowLeftPressed'){
            this.player.setState(states.RUNNING_LEFT);
        }else if(input === 'ArrowUpPressed'){
            this.player.setState(states.JUMPING_RIGHT);
        }
    }
}
export class RunningRight extends State{
    constructor(player){
        super('RUNNING_RIGHT');
        this.player = player;
    }
    
    enter(){
        this.player.runningRight = true;
        this.player.frameY = 8;
        if(this.player.runningLeft){
            this.player.speed = 0;
        }
        this.player.speed += this.player.maxSpeed;
        // printMovement(this.runningLeft, this.runningRight);
    }
    handleInput(input){
        if(input === 'ArrowDownPressed'){
            this.player.setState(states.STANDING);
        }else if(input === 'ArrowUpPressed'){
            this.player.setState(states.JUMPING_RIGHT);
        }else if(input === 'ArrowLeftPressed'){
            this.player.setState(states.RUNNING_LEFT);
        }
        else if(input === 'ArrowRightReleased'){
            this.player.runningRight = false;
            this.player.speed = 0;
            if(this.player.runningLeft){
                this.player.setState(states.RUNNING_LEFT);
            }else{
                this.player.setState(states.STANDING);
            }
        }
    }
}
export class RunningLeft extends State{
    constructor(player){
        super('RUNNING_LEFT');
        this.player = player;
    }
    
    enter(){
        this.player.runningLeft = true;
        this.player.frameY = 8;
        if(this.player.runningRight){
            this.player.speed = 0;
        }
        this.player.speed -= this.player.maxSpeed;
        // printMovement(this.runningLeft, this.runningRight);
    }
    handleInput(input){
        if(input === 'ArrowDownPressed'){
            this.player.setState(states.STANDING);
        }else if(input === 'ArrowUpPressed'){
            this.player.setState(states.JUMPING_RIGHT);
        }else if(input === 'ArrowRightPressed'){
            this.player.setState(states.RUNNING_RIGHT);
        }
        else if(input === 'ArrowLeftReleased'){
            this.player.runningLeft = false;
            this.player.speed = 0;
            if(this.player.runningRight){
                this.player.setState(states.RUNNING_RIGHT);
            }else{
                this.player.setState(states.STANDING);
            }
        }
    }
}
export class JumpingRight extends State{
    constructor(player){
        super('JUMPING_RIGHT');
        this.player = player;
    }

    enter(){
        this.player.frameY = 7;
        if(this.player.playerOnGround()){
            this.player.vy -=  30;
        }
    }
    handleInput(input){
        if(input === 'ArrowLeftPressed'){
            this.player.setState(states.JUMPING_LEFT);
        }
    }
}

export class JumpingLeft extends State{
    constructor(player){
        super('JUMPING_LEFT');
        this.player = player;
    }

    enter(){
        this.player.frameY = 7;
        if(this.player.playerOnGround()){
            this.player.vy -=  30;
        }
    }
    handleInput(input){
        if(input === 'ArrowRightPressed'){
            this.player.setState(states.JUMPING_RIGHT);
        }
    }
}