export default class Paddle{
    constructor(game){
        
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width = 150;
        this.height = 30;

        this.position = {
            x: this.gameWidth/2 - this.width/2,
            y: this.gameHeight - this.height - 10
        }

        this.maxSpeed = 7;
        this.speed = 0;
    }

    // METHODS

    draw(ctx){
        // RANDOM COLOR GENERATOR FOR PADDLE.
        // let attr1 =  Math.floor(Math.random()*256);
        // let attr2 =  Math.floor(Math.random()*256);
        // let attr3 =  Math.floor(Math.random()*256);
        // let rdmColor = `#${attr1.toString(16)}${attr2.toString(16)}${attr3.toString(16)}`
        // ctx.fillStyle = rdmColor;
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