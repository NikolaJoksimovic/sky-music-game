import Layer from "./layer.js";

export default class Background{
    constructor(game){
        this.game = game;
        this.layers = [];
        this.layer1 = document.getElementById("layer1");
        this.layer2 = document.getElementById("layer2");
        this.layer3 = document.getElementById("layer3");
        this.layer4 = document.getElementById("layer4");
        this.layer5 = document.getElementById("layer5");        

        // layers
        this.layer1Speed = 0.2;
        this.layer2Speed = 1;
        this.layer3Speed = 2;
        this.layer4Speed = 3;
        this.layer5Speed = 5;
        this.layers.push(new Layer(this.layer1, this.layer1Speed));
        this.layers.push(new Layer(this.layer2, this.layer2Speed));
        this.layers.push(new Layer(this.layer3, this.layer3Speed));
        this.layers.push(new Layer(this.layer4, this.layer4Speed));
        this.layers.push(new Layer(this.layer5, this.layer5Speed));
    }

    update(input, deltaTime, enemies){
        this.layers.forEach(layer=>{
            layer.update(input, deltaTime, enemies)
        });
    }

    draw(ctx){
        this.layers.forEach(layer=>{
            layer.draw(ctx)
        });
    }
}