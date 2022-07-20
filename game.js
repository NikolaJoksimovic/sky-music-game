import InputHanderl from './input_handler.js';
import Player from './player.js';
import Enemy from './enemy.js'
import Background from './background.js'

export default class Game{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.gameObjects = [];

        this.input = new InputHanderl(this);
        this.player = new Player(this);
        this.gameObjects.push(this.player);
        this.enemy = new Enemy(this);
        this.background = new Background(this);
    }

    update(){
        this.gameObjects.forEach(obj => {
            obj.update(this.input);
        });
    }

    draw(ctx){
        this.gameObjects.forEach(obj => {
            obj.draw(ctx);
        })
    }
}