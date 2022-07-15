export default class Paddle{
    constructor(gameWidth, gameHeight){
        
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 150;
        this.height = 30;

        this.position = {
            x: gameWidth/2 - this.width/2,
            y: gameHeight - this.height - 10
        }

        this.maxSpeed = 7;
        this.speed = 0;
    }

    // METHODS

    draw(ctx){
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime){
        
        this.position.x += this.speed;
        if(this.position.x < 0){
            this.position.x = 0
        }
        if(this.position.x > this.gameWidth-this.width){
            this.position.x = this.gameWidth-this.width;
        }
        
    }
    moveLeft(){
        this.speed = -this.maxSpeed;
    }
    moveRight(){
        this.speed = this.maxSpeed;
    }
    stop(){
        this.speed = 0;
    }
}