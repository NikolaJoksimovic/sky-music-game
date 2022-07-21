export default class Background{
    constructor(game){
        this.game = game;
        this.backgroundImageEl = document.getElementById("forest-bkg");
        this.x = 0;
        this.y = 0;
        this.widht = 2400;
        this.height = 720;
        this.gameSpeed = 5;
    }

    update(input, deltaTime){
        this.x -= this.gameSpeed;
        if(input.speed>0){
        }
        if(this.x < 0 - this.widht){
            this.x = 0;
        }
    }

    draw(ctx){
        ctx.drawImage(this.backgroundImageEl, this.x, this.y, this.widht, this.height);
        ctx.drawImage(this.backgroundImageEl, this.x + this.widht - this.gameSpeed, this.y, this.widht, this.height);
    }
}