export const states = {
    
    STANDING:   0,
    RUNNING:    1,
    JUMPING:    2,
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
        this.player.frameY = 8;
    }
    handleInput(input){
        if(input === 'ArrowRightPressed'){
            this.player.setState(states.RUNNING);
        }
    }
}
export class Running extends State{
    constructor(player){
        super('RUNNING');
        this.player = player;
    }
    
    enter(){
        this.player.frameY = 8;
    }
    handleInput(input){
        
    }
}
export class Jumping extends State{
    constructor(player){
        super('JUMPING');
        this.player = player;
    }

    enter(){
        this.player.frameY = 7;
    }
    handleInput(input){

    }
}