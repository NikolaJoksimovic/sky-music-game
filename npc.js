export default class Npc{

    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.size = Math.random()*50 + 50;

        this.x = canvasWidth-(this.size + Math.random()*canvasWidth/2);
        this.y = canvasHeight-(canvasHeight/3 + Math.random()*canvasHeight*2/3);
        
        this.speed = Math.random()*10;
        this.img = document.getElementById("enemy-ghost-img");
        
        this.sheetWidth = 100;
        this.sheetHeight = 100;
        this.frame = 0;

    }

    update(gameFrame, staggerFrames){
        
        this.x += (Math.random()*3-1.5);
        this.y += (Math.random()*3-1.5);

        this.frame = Math.floor(gameFrame/staggerFrames)%10;
    }
    draw(ctx){
        ctx.drawImage(this.img, this.frame*100, 0, this.sheetWidth, this.sheetHeight, this.x, this.y, this.size, this.size);
    }
}