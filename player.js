export default class Player{
    constructor(game){
        this.game = game;
        this.gameWidth = game.width;
        this.gameHeight = game.height;
        this.width = 250;
        this.height = 200;
        this.x = 0;
        this.y = this.gameHeight-this.height-50;
        this.playerImg = document.getElementById('player-img');
        this.frameX = 0;
        this.frameY = 4;
        this.verticalJump = 0;
        this.canGoUp = false;
        this.goUpAgain = false;
    }
    update(input){
        
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
        // console.log(input.goUp + " " + this.canGoUp);
        
        if(this.y <= this.gameHeight-2.6*this.height){
            this.y = this.gameHeight-2.6*this.height;
            this.canGoUp = false;
        }
        if(this.y >= this.gameHeight-this.height-50){
            this.y = this.gameHeight-this.height-50;
            this.goUpAgain = false;
        }

        if(!this.onGround()){
            this.frameY = 7;
        }
        else if(input.speed != 0){
            this.frameY = 8;
        }else{
            this.frameY = 4;
            this.frameX = 2;
        }
    }
    draw(ctx){
        ctx.fillStyle = 'white';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.playerImg, this.frameX*250, this.frameY*200, this.width, this.height,  this.x, this.y, this.width, this.height);
    }
    onGround(){
        return this.y >= this.gameHeight-this.height-50;
    }
}