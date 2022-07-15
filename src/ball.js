export default class Ball{

    constructor(gameWidth, gameHeight){

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.ballEl = document.getElementById("ball");
        this.position = {x:10, y:10};
        this.speed = {x:5, y:5};
        this.size = 20; //kodiramo velicinu lopte ali meni ne treba to trebutno..mozda za powerUp
    }

    draw(ctx){
        ctx.drawImage(this.ballEl, this.position.x, this.position.y, this.size, this.size);
    }

    update(deltaTime){

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        
        if(this.position.x > this.gameWidth - this.size || this.position.x < 0){
            this.speed.x = -this.speed.x;
        }
        if(this.position.y > this.gameHeight - this.size || this.position.y < 0){
            this.speed.y = -this.speed.y;
        }
    }
}