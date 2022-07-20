export default class InputHanderl{
    constructor(game){
        this.game = game;
        
        this.speed = 0;
        this.vy = -25;
        this.gravity = 6;

        this.goRight = false;
        this.goLeft = false;
        this.goUp = false;
        
        window.addEventListener('keydown', e =>{
            switch(e.key){
                case 'ArrowRight':
                    this.goRight = true;
                    this.speed = 5;
                    break;
                case 'ArrowLeft':
                    this.goLeft = true;
                    this.speed = -5;
                    break;
                case 'ArrowUp':
                    if(!this.goUp){
                        this.goUp = true;
                    }
                    break;

                }
            });
        window.addEventListener('keyup', e =>{
            switch(e.key){
                case 'ArrowRight':
                    this.goRight = false;
                    if(this.goLeft){
                        this.speed = -5;
                    }else{
                        this.speed = 0;
                    }
                    break;
                case 'ArrowLeft':
                    this.goLeft = false;
                    if(this.goRight){
                        this.speed = 5;
                    }else{
                        this.speed = 0;
                    }
                    break;
                case 'ArrowUp':
                    this.goUp = false;
                    break;
            }
        });
    }
}