export default class Player{
    constructor(game){
        this.game = game;
        this.gameWidth = game.width;
        this.gameHeight = game.height;
        this.width = 250;
        this.height = 200;
        this.x = 0;
        this.y = this.gameHeight-this.height;
        this.playerImg = document.getElementById('player-img');
        this.frameX = 0;
        this.frameY = 0;
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
        if(this.y >= this.gameHeight-this.height){
            this.y = this.gameHeight-this.height;
            this.goUpAgain = false;
        }

    }
    draw(ctx){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.playerImg, this.frameX, this.frameY, 250, 200,  this.x, this.y, this.width, this.height);
    }
}