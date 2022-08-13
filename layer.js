export default class Layer{
    constructor(layerImg, layerSpeed, layerWidht){
        this.layerImg = layerImg;
        this.layerSpeedNormal = layerSpeed;
        this.layerSpeedInc = layerSpeed*1.5;
        this.layerSpeed = layerSpeed;

        this.x = 0;
        this.y = 0;
        this.widht = 1920;
        this.height = 720;

    }

    update(input, deltaTime, enemies){

        this.x -= this.layerSpeed;
        if(input.includes('ArrowRight')){
            this.layerSpeed = this.layerSpeedInc;
        }else{
            this.layerSpeed = this.layerSpeedNormal;
        }
        if(this.x < 0 - this.widht){
            this.x = 0;
        }
    }

    draw(ctx){
        ctx.drawImage(this.layerImg, this.x, this.y, this.widht, this.height);
        ctx.drawImage(this.layerImg, this.x + this.widht - this.layerSpeed, this.y, this.widht, this.height);
        }
}