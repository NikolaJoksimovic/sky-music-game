export default class Layer{

    constructor(image, speedModifier, gameSpeed, ctx){
        this.image = image;
        this.speedModifier = speedModifier;
        this.gameSpeed = gameSpeed;
        this.ctx = ctx;
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.speed = this.gameSpeed * this.speedModifier;
    }
    update(newGameSpeed, gameFrame){
        this.gameSpeed = newGameSpeed;
        this.gameFrame = gameFrame;
        this.speed = this.gameSpeed*this.speedModifier;

        if(this.x <= -this.width){
            this.x = 0;
        }
        this.x = this.x - this.speed;

        // this.x = (gameFrame*this.gameSpeed % this.width); One way to do it..
    }
    draw(){
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
    setGameSpeed(value){
        this.gameSpeed = value;
    }
}