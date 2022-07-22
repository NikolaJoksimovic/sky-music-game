export default class InputHanderl{
    constructor(game){
        this.game = game;
        
        this.speed = 0;
        this.vy = -25;
        this.gravity = 9.8;

        this.goRight = false;
        this.goLeft = false;
        this.goUp = false;
        
        this.goRightBtnClicked = false;
        this.goLeftBtnClicked = false;
        this.goUpBtnClicked = false;
        this.goRightBtn = document.getElementById('right-btn');
        this.goLeftBtn = document.getElementById('left-btn');
        this.goUpBtn = document.getElementById('up-btn');


        this.goRightBtn.addEventListener("click", e =>{
            if(!this.goRightBtnClicked){
                this.goLeftBtnClicked = false;
                this.goUpBtnClicked = false;
                this.speed = 9;
                this.goRightBtnClicked = true;
            }else{
                this.speed = 0;
                this.goRightBtnClicked = false;
            }
        });
        this.goLeftBtn.addEventListener('click', e =>{
            if(!this.goLeftBtnClicked){
                this.goRightBtnClicked = false;
                this.goUpBtnClicked = false;
                this.speed = -9;
                this.goLeftBtnClicked = true;
            }else{
                this.speed = 0;
                this.goLeftBtnClicked = false;
            }
        });
        this.goUpBtn.addEventListener('click', e =>{
            this.speed
        });

        window.addEventListener('keydown', e =>{
            switch(e.key){
                case 'ArrowRight':
                    this.goRight = true;
                    this.speed = 9;
                    break;
                case 'ArrowLeft':
                    this.goLeft = true;
                    this.speed = -9;
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
                        this.speed = -9;
                    }else{
                        this.speed = 0;
                    }
                    break;
                case 'ArrowLeft':
                    this.goLeft = false;
                    if(this.goRight){
                        this.speed = 9;
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